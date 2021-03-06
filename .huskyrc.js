const preventPushToDev = `branch=\`git symbolic-ref HEAD\`
if [ "$branch" = "refs/heads/dev" ]; then
    echo "Direct push to dev is not allowed"
    exit 1
fi`;

module.exports = {
  hooks: {
    'pre-push': preventPushToDev,
  }
};