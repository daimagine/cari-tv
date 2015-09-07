// Routes default tests
describe('Routes: default', function() {
    // default route
    describe('/', function() {
        console.log('test / endpoint');
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
        console.log('test /api endpoint');
        it('api 200 response Success', function(done) {
            client.get('/api', function(err, re1, res, data) {
                if (err) return done(err);
                res.should.have.property('statusCode').and.equal(200);
                data.should.have.property('message').and.equal('Success');
                done();
            });
        });
    });
});
