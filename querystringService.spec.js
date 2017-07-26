(function() {

    beforeEach(module('baseApp'));

    fdescribe('Service: querystringService', function() {
        var querystring;

        beforeEach(inject(function (_querystring_) {
            querystring = _querystring_;

            window.location.hash = '';
            querystring.setParam('format', 'All');
        }));

        it('gets the value of a parameter in the querystring', function () {
            var expected = '#!/?format=All';
            
            expect(querystring.getParam('format')).toBe('All');
            expect(window.location.hash).toBe(expected);
        });

        it('sets or resets the key=value pair in the querystring', function () {
            var expected = '#!/?format=ServiceTest';

            expect(querystring.getParam('format')).toBe('All');

            querystring.setParam('format', 'ServiceTest');

            expect(querystring.getParam('format')).toBe('ServiceTest');
            expect(window.location.hash).toBe(expected);
        });

        it('adds a VALUE to a KEY in the querystring', function () {
            var expected = '#!/?format=3/4/5&type=text';

            querystring.setParam('format', '5');
            querystring.addParam('format', '4');
            querystring.addParam('format', '3');

            querystring.addParam('type', 'text');
            
            expect(querystring.getParam('format')).toBe('3/4/5');
            expect(window.location.hash).toBe(expected);
        });

        it('removes part of value or entire KEY/VALUE pair from the querystring', function () {
            var expected = '#!/?type=text&format=4/3';

            querystring.setParam('format', '5');
            querystring.addParam('format', '4');
            querystring.addParam('format', '3');
            querystring.setParam('type', 'text');

            expect(querystring.getParam('format')).toBe('3/4/5');

            querystring.removeParam('format', 5);

            expect(querystring.getParam('format')).toBe('4/3');
            expect(window.location.hash).toBe(expected);

            querystring.removeParam('format');

            expect(window.location.hash).toBe('#!/?type=text');
            expect(querystring.getParam('format')).toBeNull();

            querystring.removeParam();

            expect(window.location.hash).toBe('');
        });

    });

}());