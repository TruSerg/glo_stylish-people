const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");

  const renderGoods = (goods) => {
    console.log(goods);
  };

  const getData = (value, category) => {
    fetch("/db/db.json")
      .then((res) => res.json())
      .then((data) => {
        const arrayDataFiltered = category
          ? data.filter((item) => item[category] === value)
          : data;

        localStorage.setItem("goods", JSON.stringify(arrayDataFiltered));

        if (window.location.pathname !== "/goods.html") {
          window.location.href = "/goods.html";
        } else {
          renderGoods(arrayDataFiltered);
        }
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;
      getData(linkValue, category);
    });
  });

  if (
    localStorage.getItem("goods") &&
    window.location.pathname === "/goods.html"
  ) {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  }
};

getGoods();
