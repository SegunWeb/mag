equire 'bundler'
Bundler.require
doc_url = 'https://docs.google.com/spreadsheets/d/1gYTb_NgxImntaeA0nT7KrLhxZ5CLbva2VyHmBv1JoHA/edit#gid=0'
session = GoogleDrive::Session.from_service_account_key('client_secret.json')
spreadsheet = session.spreadsheet_by_url(doc_url)
worksheet = spreadsheet.worksheets.first
worksheet.rows.each { |row| puts row.first(6).join(' | ') }