import matplotlib.pyplot as plt
import numpy as np
import matplotlib as mpl

# Font configuration for Windows
mpl.rcParams['font.family'] = 'Malgun Gothic'
mpl.rcParams['axes.unicode_minus'] = False

fig, ax = plt.subplots(figsize=(6, 4))
ax.axis("off")

# Set the dimensions
ox, oy = 0.1, 0.1
xmax, ymax = 0.95, 0.95

# X axis - using -|> for filled, exact symmetrical arrow shapes
ax.annotate("", xy=(xmax, oy), xytext=(ox, oy),
            arrowprops=dict(arrowstyle="-|>", facecolor="black", color="black", mutation_scale=20, lw=1.2))
# Y axis - using EXACTLY the same arrow properties so they are identical.
ax.annotate("", xy=(ox, ymax), xytext=(ox, oy),
            arrowprops=dict(arrowstyle="-|>", facecolor="black", color="black", mutation_scale=20, lw=1.2))

# Generate data for curves
t = np.linspace(0, 10, 500)

def norm_dist(x, mean, std):
    return np.exp(-((x - mean) / std) ** 2)

# Simulating the curves from the image
# Curve A
A_t = 2.5
A = 0.8 * norm_dist(t, A_t, 0.8)
# Curve B
B_t = 4.0
B = 0.5 * norm_dist(t, B_t, 1.3)
# Curve C
C_t = 5.5
C = 0.3 * norm_dist(t, C_t, 1.8)

# Transform data to plot mapped values
t_mapped = ox + (t / 11) * (xmax - ox - 0.1)
A_mapped = oy + A * (ymax - oy - 0.1)
B_mapped = oy + B * (ymax - oy - 0.1)
C_mapped = oy + C * (ymax - oy - 0.1)

ax.plot(t_mapped, A_mapped, 'k-', lw=1.5)
ax.plot(t_mapped, B_mapped, 'k--', lw=1.8, dashes=(4, 2))
ax.plot(t_mapped, C_mapped, 'k-', lw=1.8)

# Add t1 guide line
t1_val = 4.0
t1_mapped = ox + (t1_val / 11) * (xmax - ox - 0.1)
t1_height = oy + 0.5 * (ymax - oy - 0.1)
ax.plot([t1_mapped, t1_mapped], [oy, t1_height], 'k--', lw=1.0)
ax.text(t1_mapped, oy - 0.06, "$t_1$", fontsize=15, ha='center', fontfamily='serif')

# Labels and Text
ax.text(ox - 0.03, oy - 0.05, "0", fontsize=15, fontfamily='serif')
ax.text(xmax - 0.02, oy - 0.06, "시간", fontsize=15)
ax.text(ox - 0.08, ymax - 0.03, "힘의\n크기", fontsize=15, ha='center', va='top')

# Curve pointers and labels
# A label
ax.annotate("A", xy=(ox + (2.9 / 11) * (xmax - ox - 0.1), oy + 0.65 * (ymax - oy - 0.1)),
            xytext=(ox + (3.8 / 11) * (xmax - ox - 0.1), oy + 0.75 * (ymax - oy - 0.1)),
            arrowprops=dict(arrowstyle="-", color="black", lw=0.8), fontsize=16, fontfamily='serif')

# B label
ax.text(ox + (4.6 / 11) * (xmax - ox - 0.1), oy + 0.52 * (ymax - oy - 0.1), "B", fontsize=16, fontfamily='serif')

# C label
ax.text(ox + (6.3 / 11) * (xmax - ox - 0.1), oy + 0.32 * (ymax - oy - 0.1), "C", fontsize=16, fontfamily='serif')

plt.savefig("sample_graph_standard.svg", bbox_inches='tight')
plt.savefig("sample_graph_standard.png", bbox_inches='tight', dpi=300)
print("Graphs generated successfully.")
