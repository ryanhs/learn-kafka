import NodeRSA  from 'node-rsa';


const encrypter = new NodeRSA(
  "-----BEGIN PUBLIC KEY-----" + "\n" +
  "MIBCIB--- example -- bN4Lu" + "\n" +
  "1QAID--- example -- AQAB" + "\n" +
  "-----END PUBLIC KEY-----"
  );

const decrypter = new NodeRSA(
  "-----BEGIN PRIVATE KEY-----" + "\n" +
  "AIIEvAIB---example---sGA==" + "\n" +
  "MIIdwadAIB---example---sGA==" + "\n" +
  "-----END PRIVATE KEY-----"
);

export { encrypter, decrypter }
