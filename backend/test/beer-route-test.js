'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Beer = require('../model/beer.js');
const Brewery = require('../model/brewery.js');

const PORT = process.env.PORT || 3000;

require('../server.js');

const url = `http://localhost:${PORT}`;

const exampleBeer = {
  name: 'test beer',
  style: 'test style',
  ibu: '45'
};

const exampleNewBeer = {
  name: 'new test beer',
  style: 'new test style',
  ibu: '54'
};

const exampleBrewery = {
  name: 'the brewery name',
  address: 'the address',
  phoneNumber: '555-555-5555',
  timestamp: new Date()
};

describe('Beer Routes', function(){
  describe('POST :/api/brewery/:breweryID/beer', function(){
    describe('with a valid list id and beer body', () => {
      before( done => {
        new Brewery(exampleBrewery).save()
        .then( brewery => {
          this.tempBrewery = brewery;
          done();
        })
        .catch(done);
      });

      after( done => {
        Promise.all([
          Brewery.remove({}),
          Beer.remove({})
        ])
        .then( () => done())
        .catch(done);
      });

      it('should return a beer', done => {
        request.post(`${url}/api/brewery/${this.tempBrewery._id}/beer`)
        .send(exampleBeer)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.body.name).to.equal(exampleBeer.name);
          expect(res.body.style).to.equal(exampleBeer.style);
          expect(res.body.ibu).to.equal(exampleBeer.ibu);
          done();
        });
      });
    });
  });
  describe('GET: /api/brewery/:breweryID/beer/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Brewery(exampleBrewery).save()
        .then(brewery => {
          this.tempBrewery = brewery;
          return Brewery.findByIdAndAddBeer(brewery._id, exampleBeer);
        })
        .then(beer => {
          this.tempBeer = beer;
          done();
        })
        .catch(done);
      });

      after(done => {
        Promise.all([
          Brewery.remove({}),
          Beer.remove({})
        ])
        .then(() => done())
        .catch(done);
      });

      it('should return a beer', done => {
        request.get(`${url}/api/brewery/${this.tempBrewery._id}/beer/${this.tempBeer._id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('test beer');
          expect(res.body.style).to.equal('test style');
          expect(res.body.ibu).to.equal('45');
          done();
        });
      });

      it('should return 404 not found', done => {
        request.get(`${url}/api/brewery/${this.tempBrewery._id}/beer/123469`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT: /api/brewery/:breweryID/beer/:id', function() {
    describe('with a valid body', function() {
      before( done => {
        new Brewery(exampleBrewery).save()
        .then(brewery => {
          this.tempBrewery = brewery;
          return Brewery.findByIdAndAddBeer(brewery._id, exampleBeer);
        })
        .then(beer => {
          this.tempBeer = beer;
          done();
        })
        .catch(done);
      });

      after(done => {
        Promise.all([
          Brewery.remove({}),
          Beer.remove({})
        ])
        .then(() => done())
        .catch(done);
      });

      it('should return a beer', done => {
        request.put(`${url}/api/brewery/${this.tempBrewery._id}/beer/${this.tempBeer._id}`)
        .send(exampleNewBeer)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('new test beer');
          expect(res.body.style).to.equal('new test style');
          expect(res.body.ibu).to.equal('54');
          done();
        });
      });

      it('should return 400 bad request', done => {
        request.put(`${url}/api/brewery/${this.tempBrewery._id}/beer/${this.tempBeer._id}`)
        .send(null)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });

      it('should return 404 not found', done => {
        request.put(`${url}/api/brewery/${this.tempBrewery._id}/beer/12345`)
        .send(null)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('DELETE: /api/brewery/:breweryID/beer/:id', function() {
    describe('with valid id', function() {

      before( done => {
        new Brewery(exampleBrewery).save()
        .then(brewery => {
          this.tempBrewery = brewery;
          return Brewery.findByIdAndAddBeer(brewery._id, exampleBeer);
        })
        .then(beer => {
          this.tempBeer = beer;
          done();
        })
        .catch(done);
      });

      it('should return 204', done => {
        request.delete(`${url}/api/brewery/${this.tempBrewery._id}/beer/${this.tempBeer._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(204);
          done();
        });
      });

      it('should return 404 not found', done => {
        request.delete(`${url}/api/brewery/${this.tempBrewery._id}/beer/12476291`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
