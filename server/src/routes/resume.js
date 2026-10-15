const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Whitelist: the URL picks a KEY, never a file path -> no path traversal possible.
const FILES = {
  pdf: {
    file: path.join(__dirname, '..', '..', 'files', 'resume.pdf'),
    downloadName: 'Lakshya_Vashishtha_Resume.pdf',
    type: 'application/pdf',
  },
  docx: {
    file: path.join(__dirname, '..', '..', 'files', 'resume.docx'),
    downloadName: 'Lakshya_Vashishtha_Resume.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
};

router.get('/:format', (req, res, next) => {
  const entry = FILES[req.params.format.toLowerCase()];
  if (!entry) {
    return res.status(404).json({ success: false, message: 'Unknown format. Use "pdf" or "docx".' });
  }
  fs.access(entry.file, fs.constants.R_OK, (err) => {
    if (err) {
      return res.status(404).json({ success: false, message: 'Resume file is not available right now.' });
    }
    res.type(entry.type);
    // res.download sets Content-Disposition: attachment; filename="..."
    res.download(entry.file, entry.downloadName, (sendErr) => {
      if (sendErr && !res.headersSent) next(sendErr);
    });
  });
});

module.exports = router;
