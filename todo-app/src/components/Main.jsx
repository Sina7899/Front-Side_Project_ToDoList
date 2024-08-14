function Main({ ContainerTag, containerTagProps, mainStyle, children }) {
  return (
    <main className={mainStyle}>
      <ContainerTag {...containerTagProps}>{children}</ContainerTag>
    </main>
  );
}

export { Main };
