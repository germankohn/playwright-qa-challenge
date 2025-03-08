export class DateUtils {
    static hoy = new Date();
    static proximoDia = new Date(DateUtils.hoy.getTime() + 24 * 60 * 60 * 1000);
    static proximaSemana = new Date(DateUtils.hoy.getTime() + 7 * 24 * 60 * 60 * 1000);
    static proximoAnio = new Date(DateUtils.hoy.setFullYear(DateUtils.hoy.getFullYear() + 1));
  }