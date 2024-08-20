function Nav({
  NavHeaderTag,
  navHeaderContent,
  NavListItemsTag,
  navListItems,
  navStyle,
  navHeaderStyle,
  navListItemsStyle,
}) {
  return (
    <nav className={navStyle}>
      <NavHeaderTag className={navHeaderStyle}>{navHeaderContent}</NavHeaderTag>
      <NavListItemsTag className={navListItemsStyle}>
        {navListItems}
      </NavListItemsTag>
    </nav>
  );
}

export { Nav };
