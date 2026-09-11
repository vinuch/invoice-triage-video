#!/usr/bin/env python3
"""
Applies fixes for the div/conditional close-tag ordering bugs in three
Cover Letter diagram components. Run this from the project root:

    python3 apply_diagram_fixes.py

Each fix is verified against the exact expected 'before' text before
being applied, so it's safe to run - it will refuse to touch a file
that doesn't match what we expect.
"""

import sys

def apply_fix(path, old, new, label):
    text = open(path).read()
    count = text.count(old)
    if count != 1:
        print(f"SKIP [{label}]: expected exactly 1 match in {path}, found {count}")
        return False
    text = text.replace(old, new)
    open(path, "w").write(text)
    print(f"OK   [{label}]: patched {path}")
    return True


fixes = [
    # --- CoverLetterArchitectureDiagram.tsx ---
    # Bug: the scaled-container </div> got trapped inside the
    # RETURN_START conditional instead of closing after it.
    dict(
        path="src/components/CoverLetterArchitectureDiagram.tsx",
        old="""          corrections / approval
        </div>
      </div>
      )}
    </div>""",
        new="""          corrections / approval
        </div>
      )}
    </div>
    </div>""",
        label="Architecture: fix return-arrow close order",
    ),

    # --- CoverLetterBuildWalkthroughDiagram.tsx ---
    # Bug 1: header <div> never closed, so STAGES.map ended up nested inside it.
    dict(
        path="src/components/CoverLetterBuildWalkthroughDiagram.tsx",
        old="""        <div style={{color: colors.textDim, fontSize: 12, marginTop: 4}}>
          six stages, ingestion to grounded output
        </div>

      {/* Stage nodes + connectors */}""",
        new="""        <div style={{color: colors.textDim, fontSize: 12, marginTop: 4}}>
          six stages, ingestion to grounded output
        </div>
      </div>

      {/* Stage nodes + connectors */}""",
        label="BuildWalkthrough: close header div",
    ),
    # Bug 2: tail had one redundant </div> plus wrong order for the rest.
    dict(
        path="src/components/CoverLetterBuildWalkthroughDiagram.tsx",
        old="""          </svg>
        </div>
      </div>
      </div>
      )}
    </div>
  );
};""",
        new="""          </svg>
        </div>
      )}
    </div>
    </div>
  );
};""",
        label="BuildWalkthrough: fix tail close order",
    ),

    # --- CoverLetterProofItWorksDiagram.tsx ---
    # Bug 1: header <div> never closed, so STAGES.map ended up nested inside it.
    dict(
        path="src/components/CoverLetterProofItWorksDiagram.tsx",
        old="""          Amaka Nwosu → Stripe · Grounded Application
        </div>

      {/* Stage columns */}""",
        new="""          Amaka Nwosu → Stripe · Grounded Application
        </div>
      </div>

      {/* Stage columns */}""",
        label="ProofItWorks: close header div",
    ),
    # Bug 2: tail had one redundant </div> plus wrong order for the rest.
    dict(
        path="src/components/CoverLetterProofItWorksDiagram.tsx",
        old="""        </div>
      </div>
      </div>
      )}
    </div>
  );
};""",
        new="""        </div>
      )}
    </div>
    </div>
  );
};""",
        label="ProofItWorks: fix tail close order",
    ),
]

if __name__ == "__main__":
    ok = True
    for fix in fixes:
        ok = apply_fix(fix["path"], fix["old"], fix["new"], fix["label"]) and ok
    if not ok:
        print("\nOne or more fixes were skipped - files may already be patched, or have diverged from what this script expects.")
        sys.exit(1)
    print("\nAll fixes applied. Run `npx tsc --noEmit` to confirm.")
