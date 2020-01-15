const {expect} = require('chai');

const R = require('ramda');

describe('Modules Tests', ()=>{
  describe('SearchBar Tests', ()=>{
    const searchBar = require('../js/topBar/searchBar');

    it('add text', ()=>{
      const newtext='a';
      const model= searchBar.init();
      const action= searchBar.Action.Search(newtext);
      expect(searchBar.update(model,action).text).to.equal(newtext);
    }),
    it('clear text', ()=>{
      const oldtext='te';
      const model= {text:oldtext};
      const action= searchBar.Action.Clear;
      expect(searchBar.update(model,action).text).to.not.equal(oldtext);

    }),
    it('add new text, not connected with earlier', ()=>{
      const oldtext='stary';
      const model= {text:oldtext};
      const newtext='nowy';
      const action= searchBar.Action.Search(newtext);
      expect(searchBar.update(model,action).text).to.equal(newtext);
    });
  }),
  describe('ObjectView Tests', ()=>{
    const objectView = require('../js/objectView');
    const initModel= {
      searchMode:false,
      search:{
        text:''
      },
      breadcrumb:'Home'
    };
    it('turn on searchMode', ()=>{
      const oldstate=false;
      const newstate=true;
      const model= R.assoc('searchMode',oldstate,initModel);
      const action= objectView.Action.SwitchSearchMode(newstate);
      expect(objectView.update(model,action).searchMode).to.equal(newstate);
    }),
    it('turn off searchMode when it is disabled', ()=>{
      const oldstate=false;
      const newstate=false;
      const model= R.assoc('searchMode',oldstate,initModel);
      const action= objectView.Action.SwitchSearchMode(newstate);
      expect(objectView.update(model,action).searchMode).to.equal(newstate);

    }),
    it('text is stored despite the change in top bar', ()=>{
      const stateOn=true;
      const testedText = 'test';
      const model= R.assocPath(['search','text'],testedText,R.assoc('searchMode',stateOn,initModel));
      const stateOff=false;
      const actionOff= objectView.Action.SwitchSearchMode(stateOff);
      let newModel=objectView.update(model,actionOff);
      const actionOn= objectView.Action.SwitchSearchMode(stateOn);
      expect(objectView.update(newModel,actionOn).search.text)
        .to.equal(testedText);
    });
  });
  describe('objectCreator Tests', ()=>{
    const creator = require('../js/create/objectCreator');
    const initModel={
      name:'',
      description:''
    };
    it('name change', ()=>{
      const newName='Name';
      const action= creator.Action.NameChange(newName);
      expect(creator.update(initModel,action).name).to.equal(newName);
    }),
    it('description change', ()=>{
      const newDescription='Description';
      const action= creator.Action.DescriptionChange(newDescription);
      expect(creator.update(initModel,action).description).to.equal(newDescription);
    }),
    describe('validator Tests', ()=>{
      const validator = require('../js/create/objectValidator');
      const initObjectModel={
        name:'',
        description:''
      };
      it('whitespace Name', ()=>{
        const expected=false;
        const whitespaceName='       ';
        const testedModel=R.assoc('name',whitespaceName,initObjectModel);
        expect(validator.validateObject(testedModel)).to.equal(expected);
      }),
      it('Name With Separator', ()=>{
        const utils = require('../js/breadcrumbs/breadcrumbsUtils');
        const nameWithSeparators='Descr'+utils.separator+'iption';
        const expected=false;
        const testedModel=R.assoc('name',nameWithSeparators,initObjectModel);
        expect(validator.validateObject(testedModel)).to.equal(expected);
      }),
      it('Correct Name', ()=>{
        const name='correctName';
        const expected=true;
        const testedModel=R.assoc('name',name,initObjectModel);
        expect(validator.validateObject(testedModel)).to.equal(expected);
      });
    });
  });
  describe('creator Tests', ()=>{
    const creator = require('../js/creator');
    const initModel= {
      object:{
        name:'',
        description:''
      },
      breadcrumb:'Home'
    };
    it('Modify correctly change name', ()=>{
      const concreteCreator = require('../js/create/objectCreator');
      const newName='Example';
      const action= creator.Action.Modify(concreteCreator.Action.NameChange(newName));
      expect(creator.update(initModel,action).object.name).to.equal(newName);
    });
  });
});