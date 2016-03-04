Template.applicationLayout.events
  'click [data-action=home]': (evt) ->
    Router.go 'home'
  'click [data-action=sources]': (evt) ->
    Router.go 'sources'
  'click [data-action=data]': (evt) ->
    Router.go 'data'
  'click [data-action=graph]': (evt) ->
    Router.go 'graph'
  'click [data-action=download]': (evt) ->
    Router.go 'download'  