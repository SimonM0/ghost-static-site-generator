const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);

fs.setMockFiles = (newMockFiles) => {
  mockFiles = newMockFiles;
};

// A custom version of `readFileSync` that reads from the special mocked out
// file list set via __setMockFiles
fs.readFileSync = directoryPath => mockFiles[directoryPath].contents;

fs.writeFileSync = jest.fn();

fs.readdirSync = () => Object.keys(mockFiles);

fs.lstatSync = filePath => ({
  isDirectory: () => (mockFiles[filePath] || {}).isDirectory,
});

module.exports = fs;
