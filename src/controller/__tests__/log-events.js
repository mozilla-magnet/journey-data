const { LogEvents } = require('../');

describe('post(events)', function() {
  it('should validate arguments as only an Array', function() {
    const logEvents = new LogEvents({ logEvents: () => {} });
    expect(() => logEvents.post({})).toThrow();
    expect(() => logEvents.post([])).not.toThrow();
  });

  it('should attach a uuid and timestamp if an event doesn\'t have a uuid or timestamp property', function() {
    const mockStorage = { logEvents: jest.fn() };
    const logEvents = new LogEvents(mockStorage);

    logEvents.post([{ additionalData: 'test' }]);

    const argument = mockStorage.logEvents.mock.calls[0][0][0];
    expect(argument.uuid).toBeDefined();
    expect(argument.timestamp).toBeDefined();
    expect(argument.data).toBeDefined();
    expect(argument.data.additionalData).toEqual('test');
  });
});
