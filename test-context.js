var context = require.context('./spec', true, /-spec\.js$|-spec\.jsx$/);

context.keys().forEach(context);