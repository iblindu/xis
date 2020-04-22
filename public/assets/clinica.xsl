<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>

<body>

    <table class="table" border="1">
        <thead class="thead-dark">
            <tr>
                <th rowspan="2" scope="colgroup">Data</th>
                <th rowspan="2" scope="colgroup">Ora</th>
                <th colspan="3" scope="colgroup">Pacient</th>
                <th colspan="3" scope="colgroup">Doctor</th>
                <th rowspan="2" scope="colgroup">Procedura</th>
                <th rowspan="2" colspan="2" scope="colgroup">Diagnostic</th>
                <th rowspan="2" scope="colgroup">Trimitere</th>
                <th colspan="2" scope="colgroup">Reteta</th>
                <th rowspan="2" colspan="2" scope="colgroup">Cost</th>
            </tr>
            <tr>
                <th scope="col">Nume</th>
                <th scope="col">Prenume</th>
                <th scope="col">Sex</th>
                <th scope="col">Nume</th>
                <th scope="col">Prenume</th>
                <th scope="col">Specializare</th>
                <th scope="col">Medicament</th>
                <th scope="col">Administrare</th>

            </tr>
        </thead>
        <xsl:for-each select="clinica/consultatie">
        <tbody>
            <tr>
                <td><xsl:value-of select="@data"/></td>
                <td><xsl:value-of select="@ora"/></td>
                <td><xsl:value-of select="pacient/nume"/></td>
                <td><xsl:value-of select="pacient/prenume"/></td>
                <td><xsl:value-of select="pacient/@sex"/></td>
                <td><xsl:value-of select="doctor/nume_doctor"/></td>
                <td><xsl:value-of select="doctor/prenume_doctor"/></td>
                <td><xsl:value-of select="doctor/specializare"/></td>
                <td><xsl:value-of select="procedura"/></td>
                <td><xsl:value-of select="diagnostic/@cod" /></td>
                <td><xsl:value-of select="diagnostic/@tip" /></td>
                <td><xsl:value-of select="trimitere"/></td>
                <td><xsl:value-of select="reteta/medicament"/></td>
                <td><xsl:value-of select="reteta/administrare"/></td>
                <td><xsl:value-of select="cost"/></td>
                <td><xsl:value-of select="cost/@moneda"/></td>
            </tr>
        </tbody>
        </xsl:for-each>
    </table>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
