// jest.setup.js
global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([]), // Adjust the mocked response as needed
    })
  );
  