h1 Contact Form
div.content
  form(action='/', name='contactus', id='contactus', method='post')
    fieldset
      p
        label(for='name') Name:
        br
        input(name='name', type='text', value='', id='name')
      p
        label(for='email') Email:
        br
        input(name='email', type='text', value='', id='email')
      p
        label(for='content') Message:
        br
        textarea(name='content', cols='40', rows='10', id='content')
      p
        input(name='submit', type='submit', value='Send', id='submit')
