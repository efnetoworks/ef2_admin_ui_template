export default  ({ app }, inject) =>  {

  inject('formatDate', the_date => {
    console.log(`Hello ${the_date}!`)
    return new Date(the_date).toLocaleDateString("en-Ng",
    {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  })

  inject('trimString', (the_string, length) => {

    return the_string.length > length
        ? the_string.substring(0, length) + "..."
        : the_string;
  })

}
