const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');
const { globalAgent } = require('http');

let globalCount = 1000

const file = 'output-js.txt'

const perfObsRunner = () => {
  window.resourceList = [];
  new PerformanceObserver((list) => {
    list.getEntries().forEach((item) => {
      window.resourceList = [...window.resourceList, item.toJSON()]
    })
  }).observe({type: 'resource', buffered: true});
}

const printResponse = (file, domain, data) => {
    // console.log(data)
    let opcode = data.response.opcode
    let length = data.response.payloadData.length
    if(opcode === 2){
        length = length / 2
    } 
    let domainJson = {[domain]: {"timestamp": data.timestamp, "bytes": length}}
    fs.appendFileSync(file, `${globalCount}:${JSON.stringify(domainJson)},`)
    globalCount -= 1
}

const startBrowserInstance = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // devtools: false,
        args: ['--no-sandbox']
    });
    return browser
}

const printGeneralResponse = (data, domain) => {
  var jsonData = {[domain]: {}}
  jsonData[domain]['connection_id'] = data.frameId
  fs.appendFileSync('output-test.txt', `"${globalCount}": ${JSON.stringify(jsonData)},`)
  globalCount -= 1
}

const getResourceTiming = async (domains) => {

  browser = await startBrowserInstance()

  //fs.appendFileSync(file, '{', (_, $) => {})
  for await (const domain of domains){
    
    try{
        const page = await browser.newPage();

        await page.evaluateOnNewDocument(perfObsRunner);
        
        await page.goto(`https://${domain}/`, { waitUntil: 'load', timeout: 30000 });

        cdp = await page.target().createCDPSession()
        
        await cdp.send('Network.enable')
        await cdp.send('Page.enable')
        
        cdp.on('Network.responseReceived', (data, va) => printGeneralResponse(data, domain))

        // const resource = await page.evaluate(() => ({ resource: window.resourceList }))

        // jsonData = {[domain]: resource}
        
        // fs.appendFileSync(file, `${globalCount}:${JSON.stringify(jsonData)}`)
        
        // globalCount = globalCount - 1

        // if(globalCount > 0){
        //     fs.appendFileSync(file, ",")
        // }
        
        await page.waitForTimeout(300000)
        await page.close();
    }
    catch(ex){
        //
    }
  }
  
  await browser.close()
}

const readFile = readline.createInterface({
    input: fs.createReadStream('domains.txt'),
    crlfDelay: Infinity
})

const main = async () => {

    domainsList = []

    for await(const domain of readFile){
        domainsList.push(domain)
    }

    globalCount = domainsList.length

    readFile.close()

    await getResourceTiming(domainsList)

}

main()
