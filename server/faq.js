var config = require('./dbconfig');
const sql = require('mssql');

async function addFaq(faqQuestion, faqAnswer) {
    try{
        console.log('running addFaq ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('faqQuestion', sql.NVarChar("MAX"), faqQuestion)
        myproc.input('faqAnswer', sql.NVarChar("MAX"), faqAnswer)
        let addFaq = await myproc.execute("addFaq")
        console.log('after proc runs, addFaq is: ', addFaq.recordset)
        return addFaq.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getFaq(faqID) {
    try{
        console.log('running getFaq ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('faqID', sql.Int, faqID)
        let getFaq = await myproc.execute("getFaq")
        console.log('after proc runs, getFaq is: ', getFaq.recordset)
        return getFaq.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
async function editFaq(faqID, faqQuestion, faqAnswer) {
    try{
        console.log('running editFaq ,about to connect to sql', faqQuestion, faqAnswer, faqID);
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('faqID', sql.Int, faqID)
        myproc.input('faqQuestion', sql.NVarChar("MAX"), faqQuestion)
        myproc.input('faqAnswer', sql.NVarChar("MAX"), faqAnswer)
        let editFaq = await myproc.execute("editFaq")
        console.log('after proc runs, editFaq is: ', editFaq.recordset)
        return editFaq.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteFaq(faqID) {
    try{
        console.log('running addFaq ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        myproc.input('faqID', sql.Int, faqID)
        let deleteFaq = await myproc.execute("deleteFaq")
        console.log('after proc runs, deleteFaq is: ', deleteFaq.recordset)
        return deleteFaq.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function getFaqs() {
    try{
        console.log('running getFaqs ,about to connect to sql');
        let pool = await sql.connect(config);
        var myproc = new sql.Request(pool);
        let getFaqs = await myproc.execute("getFaqs")
        console.log('after proc runs, getFaqs is: ', getFaqs.recordset)
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