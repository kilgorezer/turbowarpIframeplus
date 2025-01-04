(function(Scratch) {
  'use strict';

  var currentMessage = '';
  var version = 1.0;

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This example must run unsandboxed');
  }

  class extension {
    getInfo() {
      return {
        id: 'iframemessages',
        name: 'iframe+ by kilgorezer',
        docsURI: 'https://github.com/kilgorezer/turbowarpIframeplus/wiki',
        blocks: [
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: 'onmessage',
            text: 'When message received',
            isEdgeActivated: false // required boilerplate
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'sendmessage',
            text: 'Send message [MESSAGE] to iframe',
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, World!"
              }
            }
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: 'message',
            text: 'iframe message',
            disableMonitor: true
          },
          "---",
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: 'getframe',
            text: 'iframe element',
            disableMonitor: true
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'customstyle',
            text: 'Stylize iframe using CSS [MESSAGE]',
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "\/* Note that this overrides all existing properties *\/"
              }
            }
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'enabletransparency',
            text: 'Enable iframe transparency'
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'disabletransparency',
            text: 'Disable iframe transparency'
          },
          '---',
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: 'getversion',
            text: 'iframe+ version'
          }
        ]
      };
    }

    message() {
      return currentMessage;
    }

    sendmessage(d) {try{
      document.getElementsByTagName('iframe')[0].contentWindow.postMessage(d.MESSAGE, '*');
    }catch(e){}}

    customstyle(d) {try{
      var w = Scratch.vm.runtime.stageWidth;
      var h = Scratch.vm.runtime.stageHeight;
      document.getElementsByTagName('iframe')[0].style = `pointer-events: auto; border: none; width: ${w}px; height: ${h}px; transform: translate(-${w/2}px, -${h/2}px); top: 0px; left: 0px;` + d.MESSAGE; // maintaining default settings
    }catch(e){}}

    getframe() {try{
      document.getElementsByTagName('iframe')[0].style;
      return document.getElementsByTagName('iframe')[0];
    }catch(e){return document.createElement('iframe');}}

    disabletransparency(d) {try{
      document.getElementsByTagName('iframe')[0].style.background = 'white'; // maintaining default settings
    }catch(e){}}

    enabletransparency(d) {try{
      document.getElementsByTagName('iframe')[0].style.background = ''; // maintaining default settings
    }catch(e){}}

    getversion() {return version}
  }

  window.addEventListener('message', (e) => {
    currentMessage = e.data;
    Scratch.vm.runtime.startHats('iframemessages_onmessage');
  });

  Scratch.extensions.register(new extension());
})(Scratch);
