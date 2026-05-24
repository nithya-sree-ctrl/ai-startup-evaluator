import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (idea) => {
  const doc = new jsPDF();
  const { evaluation: e, title, description, targetAudience, industry } = idea;
  const pageW = doc.internal.pageSize.width;

  // Header
  doc.setFillColor(108, 99, 255);
  doc.rect(0, 0, pageW, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('AI Startup Idea Evaluator', 14, 18);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Evaluation Report: ${title}`, 14, 30);

  doc.setTextColor(30, 30, 30);
  let y = 50;

  const section = (label) => {
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(108, 99, 255);
    doc.text(label, 14, y);
    y += 6;
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
  };

  const text = (content) => {
    const lines = doc.splitTextToSize(content, pageW - 28);
    doc.text(lines, 14, y);
    y += lines.length * 6 + 4;
    if (y > 270) { doc.addPage(); y = 20; }
  };

  // Idea Info
  section('Idea Overview');
  text(`Title: ${title}`);
  text(`Industry: ${industry || 'N/A'} | Target Audience: ${targetAudience || 'N/A'}`);
  text(`Description: ${description}`);
  y += 4;

  // Scores
  section('Scores');
  text(`Overall Score: ${e.score}/100`);
  text(`Investor Readiness Score: ${e.investorScore}/100`);
  y += 4;

  // Strengths & Weaknesses
  section('Strengths');
  (e.strengths || []).forEach((s, i) => text(`${i + 1}. ${s}`));
  y += 4;

  section('Weaknesses');
  (e.weaknesses || []).forEach((w, i) => text(`${i + 1}. ${w}`));
  y += 4;

  section('Suggestions');
  (e.suggestions || []).forEach((s, i) => text(`${i + 1}. ${s}`));
  y += 4;

  // SWOT
  if (y > 200) { doc.addPage(); y = 20; }
  section('SWOT Analysis');
  autoTable(doc, {
    startY: y,
    head: [['Strengths', 'Weaknesses', 'Opportunities', 'Threats']],
    body: [[
      (e.swot?.strengths || []).join('\n'),
      (e.swot?.weaknesses || []).join('\n'),
      (e.swot?.opportunities || []).join('\n'),
      (e.swot?.threats || []).join('\n'),
    ]],
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [108, 99, 255] },
  });
  y = doc.lastAutoTable.finalY + 10;

  // Pitch
  if (y > 220) { doc.addPage(); y = 20; }
  section('Investor Pitch');
  text(`Problem: ${e.pitch?.problem || ''}`);
  text(`Solution: ${e.pitch?.solution || ''}`);
  text(`Market Opportunity: ${e.pitch?.marketOpportunity || ''}`);
  text(`Unique Value Proposition: ${e.pitch?.uniqueValueProposition || ''}`);
  y += 4;

  // Business Model
  if (y > 200) { doc.addPage(); y = 20; }
  section('Business Model Canvas');
  text(`Value Proposition: ${e.businessModel?.valueProposition || ''}`);
  text(`Key Partners: ${(e.businessModel?.keyPartners || []).join(', ')}`);
  text(`Key Activities: ${(e.businessModel?.keyActivities || []).join(', ')}`);
  text(`Customer Segments: ${(e.businessModel?.customerSegments || []).join(', ')}`);
  text(`Revenue Streams: ${(e.businessModel?.revenueStreams || []).join(', ')}`);
  y += 4;

  // Competitors
  if (y > 200) { doc.addPage(); y = 20; }
  section('Competitor Analysis');
  autoTable(doc, {
    startY: y,
    head: [['Competitor', 'Description']],
    body: (e.competitors || []).map(c => [c.name, c.description]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [108, 99, 255] },
  });
  y = doc.lastAutoTable.finalY + 10;

  // Investor Notes
  if (y > 240) { doc.addPage(); y = 20; }
  section('Investor Notes');
  text(e.investorNotes || '');

  doc.save(`${title.replace(/\s+/g, '_')}_evaluation.pdf`);
};
