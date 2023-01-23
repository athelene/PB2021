var config = require('./dbconfig');
const sql = require('mssql');

async function addFaq(faqQuestion, faqAnswer) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('faqQuestion', sql.NVarChar("MAX"), faqQuestion)
        myproc.input('faqAnswer', sql.NVarChar("MAX"), faqAnswer)
        let addFaq = await myproc.execute("addFaq")
        return addFaq.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getFaq(faqID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('faqID', sql.Int, faqID)
        let getFaq = await myproc.execute("getFaq")
        return getFaq.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
async function editFaq(faqID, faqQuestion, faqAnswer) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('faqID', sql.Int, faqID)
        myproc.input('faqQuestion', sql.NVarChar("MAX"), faqQuestion)
        myproc.input('faqAnswer', sql.NVarChar("MAX"), faqAnswer)
        let editFaq = await myproc.execute("editFaq")
        return editFaq.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteFaq(faqID) {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('faqID', sql.Int, faqID)
        let deleteFaq = await myproc.execute("deleteFaq")
        return deleteFaq.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getFaqs() {
    try{
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let getFaqs = await myproc.execute("getFaqs")
        return getFaqs.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    addFaq: addFaq,
    getFaqs: getFaqs,
    deleteFaq: deleteFaq,
    editFaq: editFaq,
    getFaq: getFaq

}