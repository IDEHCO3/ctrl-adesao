import JsPDF from 'jspdf'
import 'jspdf-autotable'

export default function controleDeAdesaoPDF (list) {
  const doc = new JsPDF()
  doc.text('Controle de Adesão - lista de Publicações', 70, 15)

  list.map((publicacao, index) => {
    if (index === 0) {
      doc.autoTable([{title: publicacao.ator_nome, dataKey: 'atorNome'}], [],
        { headStyles: {fillColor: [0, 0, 0]}, styles: {halign: 'center'}, theme: 'grid', startY: 25 })
      doc.autoTable(getColumns(), getData(publicacao), { headStyles: {fillColor: [105, 105, 105]}, theme: 'grid', startY: doc.autoTable.previous.finalY })
    } else {
      doc.autoTable([{title: publicacao.ator_nome, dataKey: 'atorNome'}], [],
        { headStyles: {fillColor: [0, 0, 0]}, styles: {halign: 'center'}, theme: 'grid', startY: doc.autoTable.previous.finalY + 10 })
      doc.autoTable(getColumns(), getData(publicacao), { headStyles: {fillColor: [105, 105, 105]}, theme: 'grid', startY: doc.autoTable.previous.finalY })
    }
  })

  const date = new Date().toLocaleDateString()
  return doc.save(`Publicação-Geoespacial-${date}.pdf`)
}

function getColumns () {
  return [
    {title: 'Metadados', dataKey: 'temMetadados'},
    {title: 'Geoserviços', dataKey: 'temGeoservicos'},
    {title: 'Download', dataKey: 'temDownload'},
    {title: 'VINDE', dataKey: 'temVinde'}
  ]
}

function getData (publicacao) {
  return [{
    temMetadados: publicacao.tem_metadados,
    temGeoservicos: publicacao.tem_geoservicos,
    temDownload: publicacao.tem_download,
    temVinde: publicacao.tem_vinde
  }]
}
