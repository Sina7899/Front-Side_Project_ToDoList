function Box({
  BoxContainerTag,
  BoxTitleTag,
  BoxTitleTagProps,
  BoxTitle,
  BoxDescriptionTag,
  BoxDescriptionTagProps,
  BoxDescription,
  buttons,
  boxContainerTagStyle,
  boxDataDivStyle,
  boxTitleTagStyle,
  boxDescriptionTagStyle,
  boxButtonsDivStyle,
}) {
  return (
    <BoxContainerTag className={boxContainerTagStyle}>
      <div className={boxDataDivStyle}>
        <BoxTitleTag {...BoxTitleTagProps} className={boxTitleTagStyle}>
          {BoxTitle}
        </BoxTitleTag>
        <BoxDescriptionTag
          {...BoxDescriptionTagProps}
          className={boxDescriptionTagStyle}
        >
          {BoxDescription}
        </BoxDescriptionTag>
      </div>
      <div className={boxButtonsDivStyle}>{buttons}</div>
    </BoxContainerTag>
  );
}

export { Box };
