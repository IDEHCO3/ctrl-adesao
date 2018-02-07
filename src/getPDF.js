import JsPDF from 'jspdf'
import 'jspdf-autotable'
import store from './store'

export default function controleDeAdesaoPDF () {
  const doc = new JsPDF()
  doc.text('Controle de Adesão', 80, 15)

  store.state.ator_list.map((ator, index) => {
    if (index === 0) {
      doc.autoTable([{title: ator.nome, dataKey: 'atorNome'}], [],
        { headerStyles: {fillColor: [10, 100, 255]}, styles: {halign: 'center'}, theme: 'grid', startY: 25 })
      doc.autoTable(getColumns(), getData(ator), { headerStyles: {fillColor: [10, 200, 255]}, theme: 'grid', startY: doc.autoTable.previous.finalY })
    } else {
      doc.autoTable([{title: ator.nome, dataKey: 'atorNome'}], [],
        { headerStyles: {fillColor: [10, 100, 255]}, styles: {halign: 'center'}, theme: 'grid', startY: doc.autoTable.previous.finalY + 10 })
      doc.autoTable(getColumns(), getData(ator), { headerStyles: {fillColor: [10, 200, 255]}, theme: 'grid', startY: doc.autoTable.previous.finalY })
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
