describe('Routes: channels', function() {
    // default route
    describe('/channels', function() {
        it('channels 200 response Success', function(done) {
            client.get(api_prefix + '/channels', function(err, re1, res, data) {
                if (err) return done(err);
                res.should.have.property('statusCode').and.equal(200);
                done();
            });
        });
    
        it('channels without location should parse IP', function(done) {
            client.get(api_prefix + '/channels', function(err, re1, res, data) {
                if (err) return done(err);
                res.should.have.property('statusCode').and.equal(200);
                done();
            });
        });
    
        it('channels with geo location', function(done) {
            client.get(api_prefix + '/channels?l=39.16554,-86.523525', function(err, re1, res, data) {
                if (err) return done(err);
                res.should.have.property('statusCode').and.equal(200);
                done();
            });
        });
    });
});
