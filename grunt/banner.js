module.exports = {
  banner: '/* <%= package.name %> - v<%= package.version %> - ' +
  '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
  '<%= package.homepage ? " * " + package.homepage + "\\n" : "" %>' +
  ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= package.author.name %>;' +
  ' Licensed <%= _.pluck(package.licenses, "type").join(", ") %> */\n',
}
