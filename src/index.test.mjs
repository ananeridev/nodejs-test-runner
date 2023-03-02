import {
  test,
  describe,
  it,
  before,
  beforeEach,
  afterEach,
  mock
} from 'node:test'
import {
  strictEqual,
  deepStrictEqual,
} from 'node:assert'

// ** aplicacao pra juncao de poderes do ricky com monstros **


function power(ricky, monster) {
    return ricky + monster
  }
  // ** Test Runner e Subtests **
  // => Teste assincrono com callback
  test('modo assincrono passando', async (t) => {
    // O teste ira passar pois a Promise retorna pelo async
    // poder de ambos nao e rejeitado
    const expected = 10
    const current = power(5, 5)
    deepStrictEqual(current, expected);
  });

 // => Teste sincrono que ira falhar os poderes
  test('synchronous failing test', (t) => {
    const expected = 10
    const current = power(5, 1)
    assert.strictEqual(current, expected);
  });

  // => Teste assincrono usando callbacks
  test('callback passa', (context, done) => {
    // Done() é a função de callback, sem parâmetros, ela passa!
    // Podemos colocar dentro do Done() um throw new error caso seja o caso do teste
    setImmediate(done);
  });

// ** Mocking**
test('spie dentro de uma funcao', () => {
  const power = mock.fn((ricky, monster) => {
    return ricky + monster;
  });

 strictEqual(power.mock.calls.length, 0);
 strictEqual(power(3, 4), 7);
 strictEqual(power.mock.calls.length, 1);

  const call = power.mock.calls[0];
 deepStrictEqual(call.arguments, [3, 4]);
 strictEqual(call.result, 7);
 strictEqual(call.error, undefined);

  // Reseta globalmente todos os mocks
  mock.reset();
});


// ** Describe/it e Skipping tests **
describe('Suite de testes', () => {
  it('deve retornar poder do Ricky com o monstro', () => {
    const expected = 10
    const current = power(5, 5)
    deepStrictEqual(current, expected)
  })
  it.skip('deve retornar tres poderes')
  it.todo('deve retornar tres poderes', {
    only: true
  }) 
})


// ** Before/ After **
describe('Suite de testes com a feature before/ after', () => {
    beforeEach(() => 
    // limpa o estado da aplicacao
    console.log('vou rodar antes de cada teste!')
  )
  afterEach(() => console.log('roda depois de cada testes'))
  before(() => console.log('roda antes do proximo teste'))
  it('deve retornar poder do Ricky com o monstro', () => {
    const expected = 10
    const current = power(5, 5)
    deepStrictEqual(current, expected)
  })
  it.skip('deve retornar tres poderes')
  it.todo('deve retornar tres poderes', {
    only: true
  }) 
})

// ** Only Tests **
// Para ver essas sentencas em acao utilize node --test-only ou npm run test:only
test('teste funcionando', { only: true }, async (power) => {
  // com este teste todos os subtestes rodam por default
  await power.test('rodando os subtests');

  // os contextos dos testes podem ser atualizados rodando a opcao 'only' 
  power.runOnly(true);
  await power.test('esse subteste esta no estado skipped');
  await power.test('esse subteste ira rodar', { only: true });

  // Switch the context back to execute all tests.
  power.runOnly(false);
  await power.test('este subteste agora esta rodando');

  // Explicitly do not run these tests.
  await power.test('skipped subtest 3', { only: false });
  await power.test('skipped subtest 4', { skip: true });
});

// A unica opcao aqui eh nao usar o set por isso nao deve passar e eh pulado.
test('este teste nao ira rodar', () => {
  // This code is not run.
  throw new Error('fail');
});


// ** Filtrando testes pelo nome **
// utilize o comando node --test-name-pattern
test('Teste 1', async (t) => {
  await t.test('test 2');
  await t.test('test 3');
});

test('Test 4', async (t) => {
  await t.test('Test 5');
  await t.test('test 6');
});

// ** Watch mode **
// npm run test
// node --test --watch src/index.test.mjs dentro package.json

// ** Test Coverage nativo **
// npm rum test:cov



// ** Test reporter esta numa classe a parte


// ** Extraneous asynchronous activity
// Ja esta num exemplo
test('teste que cria atividade assincrona', (t) => {
  setImmediate(() => {
    t.test('subtest criado mto tarde', (t) => {
      throw new Error('error1');
    });
  });

  setImmediate(() => {
    throw new Error('error2');
  });

  // The test finishes after this line.
});

