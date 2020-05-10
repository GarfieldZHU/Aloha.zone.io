// Copyright 2018-2020 @GarfieldZHU. All rights reserved. MIT license.

// Ramda must
import R from 'ramda'

// A nested object returned from API
// We need to query out Scott's data:
// [
//   {id: 110, title: "Rename everything", 
//       dueDate: "2013-11-15", priority: "medium"},
//   {id: 104, title: "Do something", 
//       dueDate: "2013-11-29", priority: "high"}
// ]
const data = {
  result: "SUCCESS",
  interfaceVersion: "1.0.3",
  requested: "10/17/2013 15:31:20",
  lastUpdated: "10/16/2013 10:52:39",
  tasks: [
    {id: 104, complete: false,            priority: "high",
              dueDate: "2013-11-29",      username: "Scott",
              title: "Do something",      created: "9/22/2013"},
    {id: 105, complete: false,            priority: "medium",
              dueDate: "2013-11-22",      username: "Lena",
              title: "Do something else", created: "9/22/2013"},
    {id: 107, complete: true,             priority: "high",
              dueDate: "2013-11-22",      username: "Mike",
              title: "Fix the foo",       created: "9/22/2013"},
    {id: 108, complete: false,            priority: "low",
              dueDate: "2013-11-15",      username: "Punam",
              title: "Adjust the bar",    created: "9/25/2013"},
    {id: 110, complete: false,            priority: "medium",
              dueDate: "2013-11-15",      username: "Scott",
              title: "Rename everything", created: "10/2/2013"},
    {id: 112, complete: true,             priority: "high",
              dueDate: "2013-11-27",      username: "Lena",
              title: "Alter all quuxes",  created: "10/5/2013"}
    // , ...
  ]
}

// A fake fetchData method for request API
const fetchData = async () => {
  // Fetch data here
}


// -----------------------------------------------------------------------------

// Direct promise style
const getIncompleteTaskSummaries = function(membername: string) {
  return fetchData()
    .then(function(data: any) {
        return data.tasks
    })
    .then(function(tasks: any) {
        var results = []
        for (var i = 0, len = tasks.length; i < len; i++) {
            if (tasks[i].username == membername) {
                results.push(tasks[i])
            }
        }
        return results
    })
    .then(function(tasks: any) {
      const results = []
      for (var i = 0, len = tasks.length; i < len; i++) {
        if (!tasks[i].complete) {
          results.push(tasks[i])
        }
      }
      return results
    })
    .then(function(tasks: any) {
      const results = []
      let task
      for (var i = 0, len = tasks.length; i < len; i++) {
        task = tasks[i]
        results.push({
            id: task.id,
            dueDate: task.dueDate,
            title: task.title,
            priority: task.priority,
        })
      }
      return results
    })
    .then(function(tasks: any) {
      tasks.sort(function(first: any, second: any) {
        const a = first.dueDate, b = second.dueDate
        return a < b ? -1 : a > b ? 1 : 0
      })
      return tasks
    })
}


// -----------------------------------------------------------------------------

// Using ramda to simplify the query steps in FP
const getIncompleteTaskSummaries_v2 = function(membername: string) {
  return fetchData()
    .then(R.get('tasks'))
    .then(R.filter(R.propEq('username', membername)))
    .then(R.reject(R.propEq('complete', true)))
    .then(R.map(R.pick(['id', 'dueDate', 'title', 'priority'])))
    .then(R.sortBy(R.get('dueDate')));
}

// -----------------------------------------------------------------------------

// Compose the promises calculation
// extract props by `prop` or `get` 
const SelectTasks = R.prop('tasks');

const filterMember = (member: string) => R.filter(
  R.propEq('username', member)
);

const excludeCompletedTasks = R.reject(R.propEq('complete', true));

const selectFields = R.map(
  R.pick(['id', 'dueDate', 'title', 'priority'])
);

const sortByDueDate = R.sortBy(R.prop('dueDate'));

// Compose the above functions
const getIncompleteTaskSummaries_v3 = function(membername: string) {
  return fetchData().then(
    R.pipe(
      SelectTasks,
      filterMember(membername),
      excludeCompletedTasks,
      selectFields,
      sortByDueDate,
    )
  );
};
