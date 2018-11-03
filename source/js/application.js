$(function () {
  // bootstrap tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // slimscroll
  if (typeof $.fn.slimScroll != 'undefined') {
    $(".sidebar .slimContent").slimScroll({
      height: $(window).height(),
      color: "rgba(0,0,0,0.15)",
      size: "5px",
      position: 'right',
      // allowPageScroll: true
    });
  }

  $(window).resize(function () {
    //alert("窗体大小改变了！");
    if ($(window).width() > 992) {
      location.reload();
    }
  });

  //手机分辨率下不自动打开目录
  if ($(window).width() > 768) {
    $('a.toggle-btn').trigger('click');
  }

  $('a.fix-collapse').trigger('click');

  $('#collapseToc').on('shown.bs.collapse', function () {
    // do something…
    // slimscroll
    if (typeof $.fn.slimScroll != 'undefined') {
      $(".sidebar .slimContent").slimScroll().on('slimscroll');
    }
  });

  // geopattern 背景生成
  $(".geopattern").each(function () {
    $(this).geopattern($(this).data('pattern-id'));
  });

  // okayNav
  var navigation = $('#nav-main').okayNav({
    swipe_enabled: false, // If true, you'll be able to swipe left/right to open the navigation
  });

  // modal居中
  // $('.modal').on('shown.bs.modal', function(e) {
  //   $(this).show();
  //   var modalDialog = $(this).find(".modal-dialog");
  //    // Applying the top margin on modal dialog to align it vertically center 
  //   modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
  // });

  // sticky
  $('[data-stick-bottom]').keepInView({
    fixed: false,
    parentClass: "has-sticky",
    customClass: "sticky",
    trigger: 'bottom',
    zindex: 42,
    edgeOffset: 0
  });

  $('[data-stick-top]').keepInView({
    fixed: true,
    parentClass: "has-sticky",
    customClass: "sticky",
    trigger: 'top',
    zindex: 42,
    edgeOffset: 0
  });

  // menu auto highlight
  var menuHighlight = $("ul.main-nav").hasClass('menu-highlight');
  if (menuHighlight) {
    var currentPathname = location.pathname,
      $menuList = $("ul.main-nav>li"),
      activeIndex = -1;
    for (var i = 0, length = $menuList.length; i < length; i++) {
      var itemHref = $($menuList[i]).find('a').attr('href');
      if (currentPathname.indexOf(itemHref) > -1 ||
        (currentPathname === '/' && (itemHref === '/.' || itemHref === '/' || itemHref === 'index.html' || itemHref === '/index.html'))) {
        activeIndex = i;
      }
      $($menuList[i]).removeClass('active');
    }
    $menuList[activeIndex] && $($menuList[activeIndex]).addClass('active');
  }

  //gotop
  var top = $("#go-top");
  var a = document.getElementById("LeftHeader");
  var b = document.getElementById("LeftFooter");
  var c = document.getElementById("RightSidebar");
  $(window).scroll(function () {
    var topnum = $(document).scrollTop();
    if ($(window).width() > 992) {
      if (topnum > 300) {
        a.style.visibility = 'hidden';
        b.style.visibility = 'hidden';
        c.style.visibility = 'hidden';
      } else {
        a.style.visibility = 'visible'
        b.style.visibility = 'visible'
        c.style.visibility = 'visible'
      }
    }
    (topnum > 300) ? top.show(300): top.hide(200);
    top.click(function (e) {
      $('body,html').animate({
        scrollTop: 0
      });
      // 改用此句子而非 return false 的原因：https://my.oschina.net/taisha/blog/79138
      e.stopImmediatePropagation();
    })
  });
});
