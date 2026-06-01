# B64Tools

Uma ferramenta frontend simples para conversão e manipulação de Base64, GZip e PDF diretamente no navegador.

## Recursos

- Text → Base64
- Base64 → Text
- Text → Base64 URL-safe
- Base64 URL-safe → Text
- Hex → Base64
- Base64 → Hex
- Text → Data URI
- Data URI → Base64
- Base64 → MIME Base64
- MIME/PEM → Base64
- Text → Base64 UTF-16
- Base64 UTF-16 → Text
- Text → Base64 UTF-32
- Base64 UTF-32 → Text
- Text → Base64Gzip
- Base64Gzip → Text
- PDF → Base64
- Base64 → PDF
- PDF → Base64Gzip
- Base64Gzip → PDF

## Como usar

1. Abra `index.html` no navegador.
2. Selecione a operação desejada.
3. Cole o texto de entrada ou selecione um arquivo PDF quando necessário.
4. Clique em `Converter`.
5. Copie o resultado usando `Copiar saída` ou faça download do PDF gerado.

## Dependências

- [pako](https://github.com/nodeca/pako) — biblioteca usada para compressão/descompressão GZip no navegador.

## Licença

- O projeto principal está licenciado como `MIT`.
- A biblioteca `pako` usada está licenciada sob `Zlib`.

## Observações

- A conversão URL-safe usa `-` e `_` em vez de `+` e `/`, e remove o padding `=`.
- A conversão MIME/PEM formata Base64 em linhas de até 76 caracteres, compatíveis com e-mails e certificados.
- UTF-16 e UTF-32 usam codificação de texto para bytes antes de codificar em Base64.
