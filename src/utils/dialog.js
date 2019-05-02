import swal from 'sweetalert2'

export class Dialog {
  async confirm({ title = 'are you sure?', text, yes = 'Yes' }, callback) {
    swal({
      title: title,
      text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: yes,
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      reverseButtons: true,
    }).then((result) => {
      callback(result)
    })
  }

  async success({ title, text }) {
    swal({
      type: 'success',
      title,
      text,
      showConfirmButton: false,
      timer: 2200,
    })
  }

  async error({ title, text }) {
    swal({
      type: 'error',
      title,
      text,
    })
  }

  async warning({ title, text }) {
    swal({
      type: 'warning',
      title,
      text,
      timer: 2200,
    })
  }

  async info({ title, text }) {
    swal({
      title,
      text,
      timer: 2200,
    })
  }

  displayRes(res, action) {
    if (res.result) this.success({ title: `${action} completed` })
    else {
      this.error({
        title: `${action} incompleted`,
        text: res.message,
      })
    }
  }

  displayErrRes(res, title = 'Loading has problem') {
    if (res.result === false) {
      this.error({ title, text: res.message })
    }
  }
}

export const dialog = new Dialog()
export default dialog
