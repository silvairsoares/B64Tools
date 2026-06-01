const operationSelect = document.getElementById('operation');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const outputFormatSelect = document.getElementById('outputFormat');
const inputFile = document.getElementById('inputFile');
const inputTextGroup = document.getElementById('inputTextGroup');
const inputFileGroup = document.getElementById('inputFileGroup');
const previewPanel = document.getElementById('previewPanel');
const pdfPreview = document.getElementById('pdfPreview');
const downloadLink = document.getElementById('downloadLink');
const convertButton = document.getElementById('convertButton');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');

const operations = {
    'text-to-base64': { type: 'text', label: 'Text → Base64' },
    'base64-to-text': { type: 'text', label: 'Base64 → Text' },
    'text-to-base64-url': { type: 'text', label: 'Text → Base64 URL-safe' },
    'base64-url-to-text': { type: 'text', label: 'Base64 URL-safe → Text' },
    'hex-to-base64': { type: 'text', label: 'Hex → Base64' },
    'base64-to-hex': { type: 'text', label: 'Base64 → Hex' },
    'text-to-data-uri': { type: 'text', label: 'Text → Data URI' },
    'data-uri-to-base64': { type: 'text', label: 'Data URI → Base64' },
    'base64-to-mime': { type: 'text', label: 'Base64 → MIME Base64' },
    'mime-to-base64': { type: 'text', label: 'MIME/PEM → Base64' },
    'text-to-base64-utf16': { type: 'text', label: 'Text → Base64 UTF-16' },
    'base64-to-text-utf16': { type: 'text', label: 'Base64 UTF-16 → Text' },
    'text-to-base64-utf32': { type: 'text', label: 'Text → Base64 UTF-32' },
    'base64-to-text-utf32': { type: 'text', label: 'Base64 UTF-32 → Text' },
    'text-to-gzip-base64': { type: 'text', label: 'Text → Base64Gzip' },
    'gzip-base64-to-text': { type: 'text', label: 'Base64Gzip → Text' },
    'pdf-to-base64': { type: 'file', label: 'PDF → Base64' },
    'base64-to-pdf': { type: 'text', label: 'Base64 → PDF' },
    'pdf-to-gzip-base64': { type: 'file', label: 'PDF → Base64Gzip' },
    'gzip-base64-to-pdf': { type: 'text', label: 'Base64Gzip → PDF' },
};

operationSelect.addEventListener('change', updateUI);
outputFormatSelect.addEventListener('change', reformatOutput);
convertButton.addEventListener('click', convert);
copyButton.addEventListener('click', copyOutput);
clearButton.addEventListener('click', clearAll);

updateUI();

function updateUI() {
    const operation = operationSelect.value;
    const usesFile = operations[operation].type === 'file';
    inputFileGroup.classList.toggle('hidden', !usesFile);
    inputTextGroup.classList.toggle('hidden', usesFile);
    previewPanel.classList.add('hidden');
    previewPanel.hidden = true;
    pdfPreview.src = '';
    downloadLink.href = '#';
    outputText.value = '';
    inputText.placeholder = usesFile ? 'Selecione um PDF para converter...' : 'Cole texto, Base64 ou Base64Gzip aqui...';
}

function clearAll() {
    inputText.value = '';
    outputText.value = '';
    inputFile.value = null;
    previewPanel.classList.add('hidden');
    previewPanel.hidden = true;
    pdfPreview.src = '';
    downloadLink.href = '#';
}

async function convert() {
    const operation = operationSelect.value;
    previewPanel.classList.add('hidden');
    pdfPreview.src = '';
    downloadLink.href = '#';

    try {
        switch (operation) {
            case 'text-to-base64':
                outputText.value = formatOutput(encodeTextToBase64(inputText.value));
                break;
            case 'base64-to-text':
                outputText.value = formatOutput(decodeBase64ToText(inputText.value));
                break;
            case 'text-to-base64-url':
                outputText.value = formatOutput(encodeTextToBase64UrlSafe(inputText.value));
                break;
            case 'base64-url-to-text':
                outputText.value = formatOutput(decodeBase64UrlSafeToText(inputText.value));
                break;
            case 'hex-to-base64':
                outputText.value = formatOutput(encodeHexToBase64(inputText.value));
                break;
            case 'base64-to-hex':
                outputText.value = formatOutput(decodeBase64ToHex(inputText.value));
                break;
            case 'text-to-data-uri':
                outputText.value = formatOutput(encodeTextToDataUri(inputText.value));
                break;
            case 'data-uri-to-base64':
                outputText.value = formatOutput(decodeDataUriToBase64(inputText.value));
                break;
            case 'base64-to-mime':
                outputText.value = formatOutput(encodeBase64ToMime(inputText.value));
                break;
            case 'mime-to-base64':
                outputText.value = formatOutput(decodeMimeBase64ToBase64(inputText.value));
                break;
            case 'text-to-base64-utf16':
                outputText.value = formatOutput(encodeTextToBase64Utf16(inputText.value));
                break;
            case 'base64-to-text-utf16':
                outputText.value = formatOutput(decodeBase64ToTextUtf16(inputText.value));
                break;
            case 'text-to-base64-utf32':
                outputText.value = formatOutput(encodeTextToBase64Utf32(inputText.value));
                break;
            case 'base64-to-text-utf32':
                outputText.value = formatOutput(decodeBase64ToTextUtf32(inputText.value));
                break;
            case 'text-to-gzip-base64':
                outputText.value = formatOutput(encodeTextToGzipBase64(inputText.value));
                break;
            case 'gzip-base64-to-text':
                outputText.value = formatOutput(decodeGzipBase64ToText(inputText.value));
                break;
            case 'pdf-to-base64':
                outputText.value = formatOutput(await encodePdfFileToBase64());
                break;
            case 'base64-to-pdf':
                await decodeBase64ToPdf(inputText.value, 'arquivo.pdf');
                outputText.value = 'PDF criado. Use o botão de download ou visualize abaixo.';
                break;
            case 'pdf-to-gzip-base64':
                outputText.value = formatOutput(await encodePdfFileToGzipBase64());
                break;
            case 'gzip-base64-to-pdf':
                await decodeGzipBase64ToPdf(inputText.value, 'arquivo.pdf');
                outputText.value = 'PDF criado. Use o botão de download ou visualize abaixo.';
                break;
            default:
                outputText.value = 'Operação inválida.';
        }
    } catch (error) {
        outputText.value = `Erro: ${error.message || error}`;
    }
}

function formatOutput(value) {
    const format = outputFormatSelect.value;
    if (!value || format === 'text' || format === 'others') {
        return value;
    }

    if (format === 'json') {
        try {
            const parsed = JSON.parse(value);
            return JSON.stringify(parsed, null, 2);
        } catch (e) {
            return value;
        }
    }

    if (format === 'xml') {
        if (!value.trim().startsWith('<')) {
            return value;
        }
        return formatXml(value);
    }

    if (format === 'yaml') {
        return formatYaml(value);
    }

    return value;
}

function reformatOutput() {
    if (!outputText.value) {
        return;
    }

    const original = outputText.value;
    const formatted = formatOutput(original);
    outputText.value = formatted;
}

function formatXml(xml) {
    const PADDING = '  ';
    const reg = /(>)(<)(\/?)/g;
    let formatted = '';
    let pad = 0;
    xml = xml.replace(reg, '$1\n$2$3');
    xml.split('\n').forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/.+>$/)) {
            indent = 0;
        } else if (node.match(/^<\/.+/)) {
            if (pad !== 0) pad -= 1;
        } else if (node.match(/^<[^!].*[^\/]>/)) {
            indent = 1;
        }

        formatted += PADDING.repeat(pad) + node + '\n';
        pad += indent;
    });
    return formatted.trim();
}

function formatYaml(text) {
    return text.replace(/\t/g, '  ').split('\n').map((line) => {
        const trimmedEnd = line.trimEnd();
        if (!trimmedEnd) {
            return '';
        }

        const leadingSpaces = line.match(/^[ \t]*/)[0].replace(/\t/g, '  ').length;
        const normalizedIndent = '  '.repeat(Math.round(leadingSpaces / 2));
        return normalizedIndent + trimmedEnd.trimStart();
    }).join('\n');
}

function copyOutput() {
    if (!outputText.value) {
        return;
    }
    navigator.clipboard.writeText(outputText.value).then(() => {
        copyButton.textContent = 'Copiado!';
        setTimeout(() => (copyButton.textContent = 'Copiar saída'), 1200);
    }).catch(() => {
        copyButton.textContent = 'Falha ao copiar';
        setTimeout(() => (copyButton.textContent = 'Copiar saída'), 1200);
    });
}

function encodeTextToBase64(text) {
    const bytes = new TextEncoder().encode(text);
    return uint8ArrayToBase64(bytes);
}

function decodeBase64ToText(base64) {
    const bytes = base64ToUint8Array(base64.trim());
    return new TextDecoder().decode(bytes);
}

function encodeTextToGzipBase64(text) {
    const bytes = new TextEncoder().encode(text);
    const compressed = pako.gzip(bytes);
    return uint8ArrayToBase64(compressed);
}

function decodeGzipBase64ToText(base64) {
    const bytes = base64ToUint8Array(base64.trim());
    const inflated = pako.inflate(bytes);
    return new TextDecoder().decode(inflated);
}

function encodeTextToBase64UrlSafe(text) {
    return base64ToUrlSafe(encodeTextToBase64(text));
}

function decodeBase64UrlSafeToText(base64Url) {
    return decodeBase64ToText(urlSafeToBase64(base64Url.trim()));
}

function base64ToUrlSafe(base64) {
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function urlSafeToBase64(urlSafe) {
    let base64 = urlSafe.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad === 2) base64 += '==';
    else if (pad === 3) base64 += '=';
    else if (pad === 1) throw new Error('URL-safe Base64 inválido.');
    return base64;
}

function encodeHexToBase64(hex) {
    const cleaned = hex.replace(/[^0-9a-fA-F]/g, '');
    if (cleaned.length % 2 !== 0) {
        throw new Error('Hex inválido. Deve conter um número par de dígitos.');
    }
    const bytes = new Uint8Array(cleaned.length / 2);
    for (let i = 0; i < cleaned.length; i += 2) {
        bytes[i / 2] = parseInt(cleaned.substr(i, 2), 16);
    }
    return uint8ArrayToBase64(bytes);
}

function decodeBase64ToHex(base64) {
    const bytes = base64ToUint8Array(base64.trim());
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function encodeTextToDataUri(text) {
    return `data:text/plain;charset=utf-8;base64,${encodeTextToBase64(text)}`;
}

function encodeBase64ToDataUri(base64) {
    return `data:application/octet-stream;base64,${base64.trim()}`;
}

function decodeDataUriToBase64(uri) {
    const match = uri.trim().match(/^data:[^;]+;base64,(.*)$/i);
    if (!match) {
        throw new Error('URI de dados inválida ou não codificada em Base64.');
    }
    return match[1];
}

function encodeBase64ToMime(base64) {
    const cleaned = base64.trim().replace(/\s+/g, '');
    return cleaned.match(/.{1,76}/g)?.join('\n') || cleaned;
}

function decodeMimeBase64ToBase64(text) {
    return text.replace(/\r?\n/g, '').replace(/-----BEGIN [^-]+-----|-----END [^-]+-----/g, '').trim();
}

function encodeTextToBase64Utf16(text) {
    const bytes = utf16ToUint8Array(text);
    return uint8ArrayToBase64(bytes);
}

function decodeBase64ToTextUtf16(base64) {
    const bytes = base64ToUint8Array(base64.trim());
    return utf16FromUint8Array(bytes);
}

function encodeTextToBase64Utf32(text) {
    const bytes = utf32ToUint8Array(text);
    return uint8ArrayToBase64(bytes);
}

function decodeBase64ToTextUtf32(base64) {
    const bytes = base64ToUint8Array(base64.trim());
    return utf32FromUint8Array(bytes);
}

function utf16ToUint8Array(text) {
    const bytes = new Uint8Array(text.length * 2);
    for (let i = 0; i < text.length; i += 1) {
        const code = text.charCodeAt(i);
        bytes[i * 2] = code & 0xff;
        bytes[i * 2 + 1] = code >> 8;
    }
    return bytes;
}

function utf16FromUint8Array(bytes) {
    const length = Math.floor(bytes.length / 2);
    const chars = [];
    for (let i = 0; i < length; i += 1) {
        const code = bytes[i * 2] | (bytes[i * 2 + 1] << 8);
        chars.push(String.fromCharCode(code));
    }
    return chars.join('');
}

function utf32ToUint8Array(text) {
    const codePoints = Array.from(text);
    const bytes = new Uint8Array(codePoints.length * 4);
    let offset = 0;
    for (const char of codePoints) {
        const code = char.codePointAt(0);
        bytes[offset++] = code & 0xff;
        bytes[offset++] = (code >> 8) & 0xff;
        bytes[offset++] = (code >> 16) & 0xff;
        bytes[offset++] = (code >> 24) & 0xff;
    }
    return bytes;
}

function utf32FromUint8Array(bytes) {
    if (bytes.length % 4 !== 0) {
        throw new Error('Quantidade inválida de bytes para UTF-32.');
    }
    let result = '';
    for (let i = 0; i < bytes.length; i += 4) {
        const code = bytes[i] | (bytes[i + 1] << 8) | (bytes[i + 2] << 16) | (bytes[i + 3] << 24);
        result += String.fromCodePoint(code);
    }
    return result;
}

async function encodePdfFileToBase64() {
    const file = getPdfFile();
    const buffer = await readFileAsArrayBuffer(file);
    return uint8ArrayToBase64(new Uint8Array(buffer));
}

async function encodePdfFileToGzipBase64() {
    const file = getPdfFile();
    const buffer = await readFileAsArrayBuffer(file);
    const compressed = pako.gzip(new Uint8Array(buffer));
    return uint8ArrayToBase64(compressed);
}

async function decodeBase64ToPdf(base64, filename) {
    const bytes = base64ToUint8Array(base64.trim());
    const blob = new Blob([bytes], { type: 'application/pdf' });
    showPdfResult(blob, filename);
}

async function decodeGzipBase64ToPdf(base64, filename) {
    const bytes = base64ToUint8Array(base64.trim());
    const inflated = pako.inflate(bytes);
    const blob = new Blob([inflated], { type: 'application/pdf' });
    showPdfResult(blob, filename);
}

function showPdfResult(blob, filename) {
    const url = URL.createObjectURL(blob);
    previewPanel.classList.remove('hidden');
    previewPanel.hidden = false;
    pdfPreview.src = url;
    downloadLink.href = url;
    downloadLink.download = filename;
}

function getPdfFile() {
    const file = inputFile.files[0];
    if (!file) {
        throw new Error('Selecione um arquivo PDF antes de converter.');
    }
    if (file.type !== 'application/pdf') {
        throw new Error('O arquivo selecionado não é um PDF válido.');
    }
    return file;
}

function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Falha ao ler o arquivo PDF.'));
        reader.readAsArrayBuffer(file);
    });
}

function uint8ArrayToBase64(bytes) {
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return btoa(binary);
}

function base64ToUint8Array(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}
