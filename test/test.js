/* jshint mocha:true */

var expect = chai.expect;
// should = chai.should();

describe('Create \'return to top\' function', function(){
  it('returnToTop should equal function', function(){
    expect(returnToTop).to.be.a('function');
  });
});

describe('Create the HTML', function(){
  it('Document should contain HTML for \'returnToTop\' button', function(){
    expect(document.querySelector('#returnToTopContainer')).to.be.a('object');
  });
});