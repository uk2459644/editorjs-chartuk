require('./index.css').toString();
import ToolboxIcon from '../assets/icon.svg';
import  Chart  from 'chart.js/auto';

export default  class Chartuk {
    /**
     * Notify core that read-only mode is supported
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported() {
      return true;
    }
  
    /**
     * Get Tool toolbox settings
     * icon - Tool icon's SVG
     * title - title to show in toolbox
     *
     * @returns {{icon: string, title: string}}
     */
    static get toolbox() {
      return {
        icon: ToolboxIcon,
        title: 'Chartuk',
      };
    }
  
    /**
     * Empty Chartuk is not empty Block
     *
     * @public
     * @returns {boolean}
     */
    static get contentless() {
      return true;
    }
  
    /**
     * Allow to press Enter inside the Chartuk
     *
     * @public
     * @returns {boolean}
     */
    static get enableLineBreaks() {
      return true;
    }
  
    /**
     * Default placeholder for Chartuk text
     *
     * @public
     * @returns {string}
     */
    static get DEFAULT_Chartuk_PLACEHOLDER() {
      return 'Enter a Chartuk';
    }
  
    /**
     * Default placeholder for Chartuk caption
     *
     * @public
     * @returns {string}
     */
    static get DEFAULT_CAPTION_PLACEHOLDER() {
      return 'Enter a type';
    }
  
    /**
     * Allowed Chartuk alignments
     *
     * @public
     * @returns {{left: string, center: string}}
     */
    static get ALIGNMENTS() {
      return {
        left: 'left',
       
      };
    }
  
    /**
     * Default Chartuk alignment
     *
     * @public
     * @returns {string}
     */
    static get DEFAULT_ALIGNMENT() {
      return Chartuk.ALIGNMENTS.left;
    }
  
    /**
     * Allow Chartuk to be converted to/from other blocks
     */
    static get conversionConfig() {
      return {
        /**
         * To create Chartuk data from string, simple fill 'text' property
         */
        import: 'text',
        /**
         * To create string from Chartuk data, concatenate text and caption
         *
         * @param {ChartukData} ChartukData
         * @returns {string}
         */
        export: function (ChartukData) {
          return ChartukData.caption ? `${ChartukData.text} — ${ChartukData.caption}` : ChartukData.text;
        },
      };
    }
  
    /**
     * Tool`s styles
     *
     * @returns {{baseClass: string, wrapper: string, Chartuk: string, input: string, caption: string, settingsButton: string, settingsButtonActive: string}}
     */
    get CSS() {
      return {
        baseClass: this.api.styles.block,
        wrapper: 'cdx-Chartuk',
        text: 'cdx-Chartuk__text',
        input: this.api.styles.input,
        caption: 'cdx-Chartuk__caption',
        settingsWrapper: 'cdx-Chartuk-settings',
        settingsButton: this.api.styles.settingsButton,
        settingsButtonActive: this.api.styles.settingsButtonActive,
      };
    }
  
    /**
     * Tool`s settings properties
     *
     * @returns {*[]}
     */
    get settings() {
      return [
        {
          name: 'center',
          icon:ToolboxIcon
         },
        
      ];
    }
  
    /**
     * Render plugin`s main Element and fill it with saved data
     *
     * @param {{data: ChartukData, config: ChartukConfig, api: object}}
     *   data — previously saved data
     *   config - user config for Tool
     *   api - Editor.js API
     *   readOnly - read-only mode flag
     */
    constructor({ data, config, api, readOnly}) {
      const { ALIGNMENTS, DEFAULT_ALIGNMENT } = Chartuk;
  
      this.api = api;
      this.readOnly = readOnly;
      
  
      this.ChartukPlaceholder = config.ChartukPlaceholder || Chartuk.DEFAULT_Chartuk_PLACEHOLDER;
      this.captionPlaceholder = config.captionPlaceholder || Chartuk.DEFAULT_CAPTION_PLACEHOLDER;
  
      this.data = {
        text: data.text || 'Enter dataset in JSON format',
        caption: data.caption || 'Enter type of chart e.g. bar, pie, bubble etc.',
        alignment: Object.values(ALIGNMENTS).includes(data.alignment) && data.alignment ||
        config.defaultAlignment ||
        DEFAULT_ALIGNMENT,
      };
      this.container=undefined;

    }
  
    /**
     * Create Chartuk Tool container with inputs
     *
     * @returns {Element}
     */
    render() {
      this.container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);
      
      if(this.readOnly == true && this.data.text!=''){
        this._createChart();
      }
      else{

      
      const Chartuk = this._make('textarea', [this.CSS.input, this.CSS.text], {
        contentEditable: !this.readOnly,
        innerHTML: this.data.text,
      });
      const caption = this._make('textarea', [this.CSS.input, this.CSS.caption], {
        contentEditable: !this.readOnly,
        innerHTML: this.data.caption,
      });
  
      Chartuk.dataset.placeholder = this.ChartukPlaceholder;
      caption.dataset.placeholder = this.captionPlaceholder;

      Chartuk.addEventListener('change',(event)=>{
          this.data.text=event.target.value;
          console.log(this.data.text);
      });

      caption.addEventListener('change',(event)=>{
       this.data.caption=event.target.value;
       console.log(this.data.caption);
      });
     this.container.appendChild(Chartuk);
     this.container.appendChild(caption);
    }

  
      return this.container;
    }
  
    /**
     * Extract Chartuk data from Chartuk Tool element
     *
     * @param {HTMLDivElement} ChartukElement - element to save
     * @returns {ChartukData}
     */
    save(ChartukElement) {
      const text = ChartukElement.querySelector(`.${this.CSS.text}`);
      const caption = ChartukElement.querySelector(`.${this.CSS.caption}`);
  
      return {
        ...this.data
      }
    }
  
    /**
     * Sanitizer rules
     */
    static get sanitize() {
      return {
        text: {
          br: true,
        },
        caption: {
          br: true,
        },
        alignment: {},
      };
    }
  
    /**
     * Create wrapper for Tool`s settings buttons:
     * 1. Left alignment
     * 2. Center alignment
     *
     * @returns {HTMLDivElement}
     */
    _createChart(){
      const ctx=document.createElement('canvas');
      //  ctx.width='400px';
      //  ctx.height='400px';
      console.log(this.data.text);
      let json=JSON.parse(this.data.text);
      console.log(json);
      const myChart=new Chart(ctx,{
        type: this.data.caption,
        data: json, 
      // options: {
      //     scales: {
      //         y: {
      //             beginAtZero: true
      //         }
      //     }
      // }
    });

      this.container.innerHTML='';

      this.container.appendChild(ctx);
      return this.container;
      
       
    }

    renderSettings() {
      const wrapper = this._make('div', [ this.CSS.settingsWrapper ], {});
      const capitalize = str => str[0].toUpperCase() + str.substr(1);
  
      this.settings
        .map(tune => {
          const el = this._make('div', this.CSS.settingsButton, {
            innerHTML: tune.icon,
            title: `${capitalize(tune.name)} alignment`,
          });
  
          el.classList.toggle(this.CSS.settingsButtonActive, tune.name === this.data.alignment);
  
          wrapper.appendChild(el);
  
          return el;
        })
        .forEach((element, index, elements) => {
          element.addEventListener('click', () => {
            this._toggleTune(this.settings[index].name);
  
            elements.forEach((el, i) => {
              const { name } = this.settings[i];
  
              el.classList.toggle(this.CSS.settingsButtonActive, name === this.data.alignment);
              if(name == 'center'){
                this._createChart();
              }
              console.log(name);
            });


          });
        });
  
      return wrapper;
    };
  
    /**
     * Toggle Chartuk`s alignment
     *
     * @param {string} tune - alignment
     * @private
     */
    _toggleTune(tune) {
      this.data.alignment = tune;
    }
  
    /**
     * Helper for making Elements with attributes
     *
     * @param  {string} tagName           - new Element tag name
     * @param  {Array|string} classNames  - list or name of CSS classname(s)
     * @param  {object} attributes        - any attributes
     * @returns {Element}
     */
    _make(tagName, classNames = null, attributes = {}) {
      const el = document.createElement(tagName);
  
      if (Array.isArray(classNames)) {
        el.classList.add(...classNames);
      } else if (classNames) {
        el.classList.add(classNames);
      }
  
      for (const attrName in attributes) {
        el[attrName] = attributes[attrName];
      }
  
      return el;
    }
  }