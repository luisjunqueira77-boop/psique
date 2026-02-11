const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  try {
    console.log('🚀 Iniciando geração do PDF...');

    const browser = await puppeteer.launch({
      headless: 'new'
    });

    const page = await browser.newPage();

    // Caminho para o arquivo HTML
    const htmlPath = path.join(__dirname, 'frontend', 'index.html');
    const fileUrl = 'file://' + htmlPath.replace(/\\/g, '/');

    // Carrega a página
    await page.goto(fileUrl, {
      waitUntil: 'networkidle2'
    });

    // Cria pasta de output se não existir
    const outputDir = path.join(__dirname, 'pdf-output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Gera PDF com configurações otimizadas
    const pdfPath = path.join(outputDir, 'Clinica-Psique-Proposta.pdf');

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true,
      preferCSSPageSize: true
    });

    await browser.close();

    console.log(`\n✅ PDF gerado com sucesso!`);
    console.log(`📁 Caminho: ${pdfPath}`);
    console.log(`📄 Nome do arquivo: Clinica-Psique-Proposta.pdf`);

  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error.message);
    process.exit(1);
  }
}

generatePDF();
