var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "http://localhost:2000";

chaiHttp = require('chai-http');

chai.use(chaiHttp);
describe("Teste Unitario",function(){
  it("Mostar Registros",function(done){
    request.get(
      {
        url : urlBase + "/show"
      },
      function(error, response, body){
          console.log(response.body);
          var _body = {};
          try{
              _body = JSON.parse(body);
            }
            catch(e){
          _body = {};
        }
        expect(response.statusCode).to.equal(200);
        done();
    }
    );
   });
   

   it('Inserir Registro', (done) => {
    let book = {placa:'12345',chassi:'222',renavam:'3',modelo:'4',marca:'5',ano:'6'}
    let jj = JSON.stringify(book)
  chai.request(urlBase)
      .post('/')
      .send(jj)
      .end((err, res) => {
            res.should.have.status(200);
        done();
      });

    });

it("Excluir registro",function(done){
    request.get(
      {
        url : urlBase + "/delete/1"
      },
      function(error, response, body){
          
          var _body = {};
          try{
              _body = JSON.parse(body);
            }
            catch(e){
          _body = {};
        }
        expect(response.statusCode).to.equal(200);
        done();
    }
    );
   });
});