const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ExcelJS = require('exceljs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () =>
    console.log("Mongo connected")
);

const snapsRouter = require("./routes/snaps");
app.use('/snaps', snapsRouter);

// Import the Snaps model (update the path accordingly)
const Snaps = require('./models/snaps');

// Function to generate the Excel report
async function generateExcelReport() {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Snap Report');

  worksheet.columns = [
    { header: 'Photographer', key: 'photographer', width: 15 },
    { header: 'Title', key: 'title', width: 20 },
    { header: 'Description', key: 'description', width: 30 },
    { header: 'Date', key: 'date', width: 15 },
  ];

  // Fetch data from the database
  const snaps = await Snaps.find({}, 'photographer title description date');
  snaps.forEach((snap) => {
    worksheet.addRow({
      photographer: snap.photographer,
      title: snap.title,
      description: snap.description,
      date: snap.date.toISOString().split('T')[0], // Formatting date
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

// Route to generate and download the report
app.get('/generate-report', async (req, res) => {
  try {
    const buffer = await generateExcelReport();
    const filename = 'snap-report.xlsx';

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

app.listen(port, () => console.log(`The app is running on Port: ${port}`));
