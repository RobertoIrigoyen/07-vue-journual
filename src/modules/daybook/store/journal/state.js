export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus beatae perferendis voluptatum delectus dolor inventore maiores consectetur facilis natus voluptatibus explicabo alias laborum in, voluptates consequatur! Id facilis inventore laborum.",
      picture: null,
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam esse iusto corrupti placeat doloribus vero dolores ipsum distinctio sunt provident, sit delectus assumenda, adipisci perspiciatis inventore beatae. Velit, aspernatur facilis? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere animi tenetur est unde excepturi aliquid et accusamus. Nesciunt, quasi veritatis atque dolore, saepe molestiae inventore rem animi tempora, esse eligendi!",
      picture: null,
    },
    {
      id: new Date().getTime() + 98765,
      date: new Date().toDateString(),
      text: "it. Ullam esse iusto corrupti placeat doloribus vero dolores ipsum distinctio sunt provident, sit delectus assumenda, adipisci perspiciatis inventore beatae. Velit, aspernatur facilis? Lorem ips",
      picture: null,
    },
  ],
});
