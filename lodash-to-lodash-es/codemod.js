/** @type {import('@types/jscodeshift').Transform} */
const codemod = (fileInfo, { jscodeshift: j }) => {
  const root = j(fileInfo.source)

  const lodashImports = root
    .find(j.ImportDeclaration)
    .filter((nodePath) => nodePath.value.source.value.startsWith('lodash'))

  lodashImports.forEach((nodePath) => {
    const id = nodePath.value.source.value.replace('lodash/', '')
    // nodePath.value.source.value.replace('lodash', 'lodash-es')
  })

  return root.toSource()
}
export default codemod
