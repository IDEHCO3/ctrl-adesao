import JsPDF from 'jspdf'
import 'jspdf-autotable'

export default function controleDeAdesaoPDF (list) {
  const doc = new JsPDF()
  doc.text('Controle de Adesão - lista de Atores', 70, 15)

  list.map((ator, index) => {
    if (index === 0) {
      doc.autoTable([{title: ator.nome, dataKey: 'atorNome'}], [],
        { headerStyles: {fillColor: [0, 0, 0]}, styles: {halign: 'center'}, theme: 'grid', startY: 25 })
      doc.autoTable(getColumns(), getData(ator), { headerStyles: {fillColor: [105, 105, 105]}, theme: 'grid', startY: doc.autoTable.previous.finalY })
    } else {
      doc.autoTable([{title: ator.nome, dataKey: 'atorNome'}], [],
        { headerStyles: {fillColor: [0, 0, 0]}, styles: {halign: 'center'}, theme: 'grid', startY: doc.autoTable.previous.finalY + 10 })
      doc.autoTable(getColumns(), getData(ator), { headerStyles: {fillColor: [105, 105, 105]}, theme: 'grid', startY: doc.autoTable.previous.finalY })
    }
  })

  const date = new Date().toLocaleDateString()
  return doc.save(`controle_de_adesao-${date}.pdf`)
}

function getColumns () {
  return [
    {title: 'Status Adesão', dataKey: 'statusAdesao'},
    {title: 'Capacitação', dataKey: 'capacitacao'},
    {title: 'Modalidade', dataKey: 'modalidade'}
  ]
}

function getData (ator) {
  return [{
    statusAdesao: ator.status_adesao,
    capacitacao: ator.capacitacao,
    modalidade: ator.modalidade
  }]
}
