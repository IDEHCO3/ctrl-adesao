import JsPDF from 'jspdf'
import 'jspdf-autotable'

export default function controleDeAdesaoPDF (list) {
  const doc = new JsPDF()
  doc.text('Controle de Adesão - lista de Representantes', 70, 15)

  list.map((representate, index) => {
    if (index === 0) {
      doc.autoTable([{title: representate.id_ator, dataKey: 'atorNome'}], [],
        { headStyles: {fillColor: [0, 0, 0]}, styles: {halign: 'center'}, theme: 'grid', startY: 25 })
      doc.autoTable(getColumns(), getData(representate), { headStyles: {fillColor: [105, 105, 105]}, theme: 'grid', startY: doc.autoTable.previous.finalY })
    } else {
      doc.autoTable([{title: representate.id_ator, dataKey: 'atorNome'}], [],
        { headStyles: {fillColor: [0, 0, 0]}, styles: {halign: 'center'}, theme: 'grid', startY: doc.autoTable.previous.finalY + 10 })
      doc.autoTable(getColumns(), getData(representate), { headStyles: {fillColor: [105, 105, 105]}, theme: 'grid', startY: doc.autoTable.previous.finalY })
    }
  })

  const date = new Date().toLocaleDateString()
  return doc.save(`Representante-${date}.pdf`)
}

function getColumns () {
  return [
    {title: 'Nome', dataKey: 'RepNome'},
    {title: 'Email', dataKey: 'email'}
  ]
}

function getData (representate) {
  return [{
    RepNome: representate.nome,
    email: representate.email1
  }]
}
