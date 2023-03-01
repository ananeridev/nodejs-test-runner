// ** Test Reporter **
export default async function * customReporter(source) {
    for await (const event of source) {
      switch (event.type) {
        case 'test:start':
          yield `test ${event.data.name} started\n`;
          break;
        case 'test:pass':
          yield `test ${event.data.name} passed\n`;
          break;
        case 'test:fail':
          yield `test ${event.data.name} failed\n`;
          break;
        case 'test:plan':
          yield 'test plan';
          break;
        case 'test:diagnostic':
          yield `${event.data.message}\n`;
          break;
      }
    } 
}