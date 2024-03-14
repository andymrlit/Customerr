const { exec } = require('child_process')
const syntax = require('syntax-error')
neoxr.create(async (m, {
   text,
   command,
   Func,
   Scraper,
   execSync,
   component,
   drive
}) => {
   if (!text) return
   if (command == '~>') {
      try {
         evL = await eval(`(async () => { return ${text} })()`)
         m.reply(Func.jsonFormat(evL))
      } catch (e) {
         let err = await syntax(text)
         m.reply(typeof err != 'undefined' ? Func.texted('monospace', err) + '\n\n' : '' + Func.jsonFormat(e))
      }
   } else if (command == '~') {
      try {
         evL = await eval(`(async () => { ${text} })()`)
         m.reply(Func.jsonFormat(evL))
      } catch (e) {
         let err = await syntax(text)
         m.reply(typeof err != 'undefined' ? Func.texted('monospace', err) + '\n\n' : '' + Func.jsonFormat(e))
      }
   } else if (command == '$') {
      client.sendReact(m.chat, '🕒', m.key)
      exec(text.trim(), (err, stdout) => {
         if (err) return m.reply(err.toString())
         if (stdout) return m.reply(stdout.toString())
      })
   }
}, {
   usage: ['~>', '~', '$'],
   owner: true
}, __filename)