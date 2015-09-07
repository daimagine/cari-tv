// Routes default tests
describe('Routes: default', function() {
    // default route
    describe('/', function() {
        it('default 200 response Success', function(done) {
            client.get('/', function(err, re1, res, data) {
                if (err) return done(err);
                res.should.have.property('statusCode').and.equal(200);
                done();
            });
        });
    });
    
    // default api route
    describe('/api', function() {
        it('api 200 response Success', function(done) {
            client.get('/api', function(err, re1, res, data) {
                if (err) return done(err);
                res.should.have.property('statusCode').and.equal(200);
                data.should.have.property('message').and.equal('Success');
                done();
            });
        });
    });
    
    // 404 api route
    describe('/notfound', function() {
        it('404 response', function(done) {
            client.get('/notfound', function(err, re1, res, data) {
                res.should.have.property('statusCode').and.equal(404);
                done();
            });
        });
    });
});
