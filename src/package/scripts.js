/**
 * This script gets compiled by repackage and replaces the scripts node in the
 * package.json. Use linux style setting of environment variables, if on
 * Windows, the scripts will have the commands swapped for Windows versions.
 */

 const GH_PAGES_ROOT = 'doc'

                          /** START SCRIPT STARTS BUILD WITH WATCHING ENABLED (USEFUL WITH NPM LINK) */
export default ({}) => ({ 'start': 'npm run build -- --watch'

                          /** CLEAN EVERYTHING PRE BUILD */
                        , 'clean': 'run-p clean-lib clean-test clean-doc'
                        , 'clean-lib': 'rimraf lib'
                        , 'clean-test': 'rimraf spec/test'
                        , 'clean-doc': 'rimraf doc'

                          /** COMPILE */
                        , 'prebuild': 'npm run clean'
                        , 'build': 'babel src/lib -d lib'
                        , 'postbuild': 'npm run build-test'
                        , 'build-test': 'babel src/spec -d spec'

                          /** TEST */
                        , 'pretest': 'npm run build'
                        , 'test': 'jasmine'

                          /** RELEASE */
                        , 'prerelease': 'npm run test && npm run git-save -- path-release'
                        , 'release': 'npm version patch && npm publish'
                        , 'postrelease': 'npm run release-gh-pages'

                          /** GH-PAGES RELEASE */
                        , 'prerelease-gh-pages': 'npm run doc'
                        , 'release-gh-pages': 'run-s gh-pages-subtree gh-pages-push gh-pages-delete'
                        , 'postrelease-gh-pages': 'npm run clean && npm run git-save -- clean && git push -u origin master --follow-tags'

                          /** ESDOC */
                        , 'predoc': `rimraf ${GH_PAGES_ROOT}`
                        , 'doc': `esdoc -c ./esdoc.json && ncp CNAME ${GH_PAGES_ROOT}/CNAME`
                        , 'postdoc': 'npm run git-save -- doc'

                          /** GIT COMMANDS */
                        , 'gh-pages-subtree': `git subtree split --prefix ${GH_PAGES_ROOT} -b gh-pages`
                        , 'gh-pages-push': 'git push -f origin gh-pages:gh-pages'
                        , 'gh-pages-delete': 'git branch -D gh-pages'
                        , 'git-save': 'git add -A && git commit -am '

                          /** UPGRADE ALL DEPENDENCIES (REQUIRES npm-check-updates INSTALLED GLOBALLY) */
                        , 'upgrade': 'ncu -a && npm update'
                        })
