// ########################################################################
// ########################### PARSARE XML ################################
// ########################################################################

//functie pentru incarcare fisierului XML ce a fost uploadat in storage
function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //apel functie de parsare
      parserXml(this);
    }
  };
  xhttp.open("GET", "storage/clinica.xml", true);
  xhttp.send();
}

//functie de parsare a continutului fisierului
function parserXml(xml) {
  //responseXML returneaza un document ce contine XML-ul incarcat
  var xmlDoc = xml.responseXML;
  //initializare tabel cu antetul acestuia
  var table =
    "<tr><th>Nume Pacient</th><th>Prenume Pacient</th><th>Nume Doctor</th><th>Prenume Doctor</th>";
  table +=
    "<th>Specializare</th><th>Procedura</th><th>Trimitere</th><th>Medicament</th>";
  table += "<th>Administrare</th><th>Cost</th></tr>";

  var i;
  //returnarea unei colectii de elemente ce contine toate elementele din document cu tag-ul consultatie
  var x = xmlDoc.getElementsByTagName("consultatie");
  for (i = 0; i < x.length; i++) {
    //pentru fiecare element din colectie se extrag elementele copil dupa numele tag-ului, pentru a fi populat tabelul
    table +=
      "<tr><td>" +
      x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("nume_doctor")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("prenume_doctor")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("specializare")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("procedura")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("trimitere")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("medicament")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("administrare")[0].childNodes[0].nodeValue +
      "</td><td>" +
      x[i].getElementsByTagName("cost")[0].childNodes[0].nodeValue +
      "</td></tr>";
  }

  //tabelul format prin parsarea fisierului XML este inserat in HTML in elementul DOM corespunzator, marcat cu id-ul "xml"
  document.getElementById("xml").innerHTML = table;
}

// ########################################################################
// ########################### PARSARE JSON ###############################
// ########################################################################

//functie pentru incarcare fisierului JSON ce a fost uploadat in storage si parsarea acestuia
function loadJSONDoc() {
  //initializare tabel cu antetul acestuia
  var table = "<tr><th>Data</th><th>Ora</th><th>Pacient</th>";
  table +=
    "<th>Doctor</th><th>Specializare</th><th>Procedura</th><th>Trimitere</th><th>Medicament</th>";
  table += "<th>Administrare</th><th>Cost</th></tr>";

  //extragere date din fisierul JSON ce se afla in storage
  $.getJSON("storage/clinica.json", function(data) {
    //populare tabel cu datele din JSON, extrase in functie de numele campului
    $.each(data.consultatii, function(i, f) {
      table +=
        "<tr>" +
        "<td>" +
        f.data +
        "</td>" +
        "<td>" +
        f.ora +
        "</td>" +
        "<td>" +
        f.pacient.nume +
        " " +
        f.pacient.prenume +
        "</td>" +
        "<td>" +
        f.doctor.nume_doctor +
        " " +
        f.doctor.prenume_doctor +
        "</td>" +
        "<td>" +
        f.doctor.specializare +
        "</td>" +
        "<td>" +
        f.procedura +
        "</td>" +
        "<td>" +
        f.trimitere.descriere +
        "</td>" +
        "<td>" +
        f.reteta.medicament +
        "</td>" +
        "<td>" +
        f.reteta.administrare +
        "</td>" +
        "<td>" +
        f.cost.suma +
        " " +
        f.cost.moneda +
        "</td>" +
        "</tr>";
    });

    //tabelul format prin parsarea fisierului JSON este inserat in HTML in elementul DOM corespunzator, marcat cu id-ul "json"
    document.getElementById("json").innerHTML = table;
  });
}

// ########################################################################
// ############### AFISARE XML CU AJUTORUL FOILOR DE STIL #################
// ########################################################################

//functie de incarcare a fisierlor necesare afisarii
function loadXMLDocForXSL(filename) {
  if (window.ActiveXObject) {
    xhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } else {
    xhttp = new XMLHttpRequest();
  }
  xhttp.open("GET", filename, false);
  try {
    xhttp.responseType = "msxml-document";
  } catch (err) {} // Helping IE11
  xhttp.send("");
  return xhttp.responseXML;
}

//functie pentru afisarea fisierului XML cu ajutorul foilor de stil
function displayXSL() {
  //incarcarea fisierului XSL necesar afisarii, precum si a fisierului XML din storage
  xml = loadXMLDocForXSL("storage/clinica.xml");
  xsl = loadXMLDocForXSL("assets/clinica.xsl");
  // transformare fisier XML in tabel, cu ajutorul fisierului XSL pentru Internet Explorer
  if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
    ex = xml.transformNode(xsl);
    //tabelul rezultat este inserat in HTML in elementul DOM corespunzator, marcat cu id-ul "xsl"
    document.getElementById("xsl").innerHTML = ex;
  }
  // transformare fisier XML in tabel, cu ajutorul fisierului XSL pentru Chrome, Firefox
  else if (document.implementation && document.implementation.createDocument) {
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml, document);
    //tabelul rezultat este inserat in HTML in elementul DOM corespunzator, marcat cu id-ul "xsl"
    document.getElementById("xsl").appendChild(resultDocument);
  }
}
