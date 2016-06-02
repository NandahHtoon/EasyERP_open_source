define([
    'Backbone',
    'Underscore',
    'text!templates/wTrack/CreateTemplate.html',
    'dataService',
    'constants'
], function (Backbone, _, CreateTemplate, dataService, CONSTANTS) {
    var CreateView = Backbone.View.extend({
        el      : '#listTable',
        template: _.template(CreateTemplate),

        initialize: function (options) {
            var responseObj;
            
            this.render(options);

            if (options.mainWtrackView) {
                responseObj = options.mainWtrackView.responseObj;
                responseObj = responseObj || {};
                
                dataService.getData(CONSTANTS.URLS.PROJECTS_GET_FOR_WTRACK, null, function (projects) {
                    projects = _.map(projects.data, function (project) {
                        project.name = project.projectName;

                        return project;
                    });

                    responseObj['#project'] = projects;
                });

                dataService.getData(CONSTANTS.URLS.EMPLOYEES_GETFORDD, null, function (employees) {
                    employees = _.map(employees.data, function (employee) {
                        employee.name = employee.name.first + ' ' + employee.name.last;

                        return employee;
                    });

                    responseObj['#employee'] = employees;
                });

                dataService.getData('/department/getForDD', null, function (departments) {
                    departments = _.map(departments.data, function (department) {
                        department.name = department.departmentName;

                        return department;
                    });

                    responseObj['#department'] = departments;
                });
            }
        },

        events: {},

        render: function (options) {
            this.$el.prepend(this.template(options));

            return this;
        }

    });

    return CreateView;
});
