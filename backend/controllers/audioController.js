const { spawn } = require('child_process');

exports.uploadAudio = (req, res, next) => {
    if (!req.file) {
        const error = new Error('No file uploaded.');
        error.status = 400;
        return next(error);
    }

    const pythonProcess = spawn('python', ['process_audio.py', req.file.path, 'uploads/stems']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        if (code === 0) {
            res.status(200).json({ 
                message: 'File processed successfully',
                filename: req.file.filename
            });
        } else {
            const error = new Error('Error processing audio file.');
            error.status = 500;
            return next(error);
        }
    });
};